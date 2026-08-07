const ORIGIN_URL = 'http://127.0.0.1:9090';
const GALLERY_ASSET_PATH = '/index.html';
const DENY_BODY = 'Share access only';
const SAFE_METHODS = new Set(['GET', 'HEAD']);
const ALWAYS_FRESH_API_PATHS = new Set(['/api/timeline/buckets', '/api/timeline/bucket']);
const JSON_API_PATHS = new Set(['/api/shared-links/me', ...ALWAYS_FRESH_API_PATHS]);
const THUMBNAIL_SIZES = new Set(['preview', 'thumbnail']);
const ASSET_PATH = /^\/api\/assets\/[A-Za-z0-9_-]{1,128}$/;
const THUMBNAIL_PATH = /^\/api\/assets\/[A-Za-z0-9_-]{1,128}\/thumbnail$/;
const SHARE_PATH = /^\/share\/([^/]+)\/?$/;
const SHARE_KEY = /^[A-Za-z0-9_-]{20,256}$/;
const FORWARDED_REQUEST_HEADERS = [
	'accept',
	'accept-language',
	'if-match',
	'if-modified-since',
	'if-none-match',
	'if-range',
	'if-unmodified-since',
	'range',
] as const;
const CONDITIONAL_REQUEST_HEADERS = ['if-match', 'if-modified-since', 'if-none-match', 'if-range', 'if-unmodified-since'];
const PRIVATE_RESPONSE_HEADERS = ['content-disposition', 'location', 'set-cookie'];
const FORWARDED_QUERY_PARAMS = new Map([
	['/api/timeline/buckets', ['albumId', 'order']],
	['/api/timeline/bucket', ['albumId', 'order', 'timeBucket']],
]);

export default {
	async fetch(request, env): Promise<Response> {
		try {
			return await handleRequest(request, env);
		} catch (error) {
			const pathname = new URL(request.url).pathname;
			logError(
				'request_failed',
				{
					method: request.method,
					path: SHARE_PATH.test(pathname) ? '/share/:key' : pathname,
				},
				error,
			);
			return textResponse('Internal server error', 500);
		}
	},
} satisfies ExportedHandler<Env>;

async function handleRequest(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const { pathname, searchParams } = url;
	const method = request.method.toUpperCase();

	if (pathname.startsWith('/api/')) {
		return isAllowedApi(pathname, method, searchParams) ? forwardApi(request, env, url) : forbidden();
	}

	return SAFE_METHODS.has(method) && shareKeyFromPath(pathname) ? galleryResponse(request, env) : forbidden();
}

async function forwardApi(request: Request, env: Env, requestUrl: URL): Promise<Response> {
	const cache = upstreamCacheMode(request.headers, ALWAYS_FRESH_API_PATHS.has(requestUrl.pathname));
	const transformsJson = isTransformedJsonPath(requestUrl.pathname);
	const shareKey = requestUrl.searchParams.get('key');
	if (!isValidShareKey(shareKey)) return forbidden();

	const response = await fetchUpstream(request, env, requestUrl, buildTargetUrl(requestUrl, shareKey), cache);

	if (!response) return upstreamErrorResponse(502);
	if (response.status === 304) {
		return transformsJson ? upstreamErrorResponse(502) : sanitizeUpstreamResponse(response);
	}
	if (!response.ok) return upstreamErrorResponse(response.status);
	if (requestUrl.pathname === '/api/shared-links/me') return sanitizeSharedLinkResponse(response);
	if (ASSET_PATH.test(requestUrl.pathname)) return sanitizeAssetResponse(response);
	return sanitizeUpstreamResponse(response);
}

async function fetchUpstream(
	request: Request,
	env: Env,
	requestUrl: URL,
	targetUrl: URL,
	cache?: 'no-store' | 'no-cache',
): Promise<Response | null> {
	try {
		return await env.NAS.fetch(targetUrl, {
			method: request.method,
			headers: sanitizeHeaders(request.headers, requestUrl),
			redirect: 'manual',
			...(cache ? { cache } : {}),
		});
	} catch (error) {
		logError(
			'upstream_fetch_failed',
			{
				method: request.method,
				path: requestUrl.pathname,
			},
			error,
		);
		return null;
	}
}

async function galleryResponse(request: Request, env: Env): Promise<Response> {
	const assetUrl = new URL(GALLERY_ASSET_PATH, request.url);
	let response: Response;

	try {
		response = await env.ASSETS.fetch(
			new Request(assetUrl, {
				method: request.method,
			}),
		);
	} catch (error) {
		logError('gallery_asset_fetch_failed', { method: request.method }, error);
		return textResponse('Gallery unavailable', 500);
	}

	if (!response.ok) {
		logError('gallery_asset_unavailable', {
			method: request.method,
			status: response.status,
		});
		return textResponse('Gallery unavailable', 500);
	}

	const headers = new Headers(response.headers);
	headers.set(
		'content-security-policy',
		"default-src 'none'; connect-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
	);
	headers.set('content-type', 'text/html; charset=utf-8');
	headers.set('cross-origin-resource-policy', 'same-origin');
	headers.set('permissions-policy', 'camera=(), geolocation=(), microphone=()');
	headers.set('referrer-policy', 'no-referrer');
	headers.set('x-content-type-options', 'nosniff');
	headers.set('x-frame-options', 'DENY');

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

function forbidden(): Response {
	return textResponse(DENY_BODY, 403);
}

function isAllowedApi(pathname: string, method: string, searchParams: URLSearchParams): boolean {
	if (!isValidShareKey(searchParams.get('key'))) return false;
	if (method === 'GET' && (JSON_API_PATHS.has(pathname) || ASSET_PATH.test(pathname))) {
		return true;
	}
	const size = searchParams.get('size');
	return (
		size !== null &&
		SAFE_METHODS.has(method) &&
		THUMBNAIL_PATH.test(pathname) &&
		THUMBNAIL_SIZES.has(size)
	);
}

async function sanitizeSharedLinkResponse(response: Response): Promise<Response> {
	const payload = await readJson(response);

	if (!isRecord(payload)) {
		logError('upstream_payload_invalid', { endpoint: '/api/shared-links/me' });
		return upstreamErrorResponse(502);
	}

	if (payload?.type === 'INDIVIDUAL') {
		return jsonResponse({
			type: 'INDIVIDUAL',
			assets: payload.assets,
			showMetadata: payload.showMetadata
		});
	}

	if (!isRecord(payload.album) || typeof payload.album.id !== 'string') {
		logError('upstream_payload_invalid', { endpoint: '/api/shared-links/me' });
		return upstreamErrorResponse(502);
	}

	const album = payload.album;

	return jsonResponse(
		{
			album: {
				id: album.id,
				albumName: stringOrEmpty(album.albumName),
				order: album.order === 'asc' ? 'asc' : 'desc',
			},
			showMetadata: payload.showMetadata === true,
		},
	);
}

async function sanitizeAssetResponse(response: Response): Promise<Response> {
	const payload = await readJson(response);
	if (!isRecord(payload) || typeof payload.id !== 'string') {
		logError('upstream_payload_invalid', { endpoint: '/api/assets/:id' });
		return upstreamErrorResponse(502);
	}
	const exifInfo = isRecord(payload.exifInfo) ? payload.exifInfo : null;

	return jsonResponse(
		{
			id: payload.id,
			width: finiteNumber(payload.width),
			height: finiteNumber(payload.height),
			originalFileName: stringOrEmpty(payload.originalFileName),
			exifInfo: {
				description: stringOrEmpty(exifInfo?.description),
			},
		},
	);
}

async function readJson(response: Response): Promise<unknown | null> {
	try {
		return await response.json<unknown>();
	} catch {
		return null;
	}
}

function jsonResponse(payload: unknown): Response {
	return new Response(JSON.stringify(payload), {
		status: 200,
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'x-content-type-options': 'nosniff',
		},
	});
}

function sanitizeUpstreamResponse(response: Response): Response {
	const headers = new Headers(response.headers);
	for (const name of PRIVATE_RESPONSE_HEADERS) headers.delete(name);
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

function upstreamErrorResponse(status: number): Response {
	const safeStatus = status >= 400 && status <= 599 ? status : 502;
	return textResponse('Immich request failed', safeStatus);
}

function textResponse(body: string, status: number): Response {
	return new Response(body, {
		status,
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'x-content-type-options': 'nosniff',
		},
	});
}

function buildTargetUrl(requestUrl: URL, shareKey: string): URL {
	const targetUrl = new URL(requestUrl.pathname, ORIGIN_URL);
	const isThumbnail = THUMBNAIL_PATH.test(requestUrl.pathname);
	const names = isThumbnail ? ['size', 'c'] : (FORWARDED_QUERY_PARAMS.get(requestUrl.pathname) ?? []);

	for (const name of names) {
		const value = requestUrl.searchParams.get(name);
		if (value) targetUrl.searchParams.set(name, value);
	}
	if (isThumbnail) targetUrl.searchParams.set('edited', 'true');
	targetUrl.searchParams.set('key', shareKey);
	return targetUrl;
}

function shareKeyFromPath(pathname: string): string {
	const match = pathname.match(SHARE_PATH);
	const encodedKey = match?.[1];
	if (!encodedKey) return '';
	try {
		const key = decodeURIComponent(encodedKey);
		return isValidShareKey(key) ? key : '';
	} catch {
		return '';
	}
}

function isValidShareKey(key: string | null): key is string {
	return typeof key === 'string' && SHARE_KEY.test(key);
}

function isTransformedJsonPath(pathname: string): boolean {
	return pathname === '/api/shared-links/me' || ASSET_PATH.test(pathname);
}

function upstreamCacheMode(headers: Headers, forceNoStore: boolean): 'no-store' | 'no-cache' | undefined {
	const cacheControl = headers.get('cache-control');
	if (forceNoStore || hasDirective(cacheControl, 'no-store')) return 'no-store';
	if (hasDirective(cacheControl, 'no-cache') || hasDirective(headers.get('pragma'), 'no-cache')) return 'no-cache';
	return undefined;
}

function hasDirective(value: string | null, expected: string): boolean {
	return value?.split(',').some((directive) => directive.trim().split('=', 1)[0]?.toLowerCase() === expected) ?? false;
}

function sanitizeHeaders(sourceHeaders: Headers, url: URL): Headers {
	const headers = new Headers();
	for (const name of FORWARDED_REQUEST_HEADERS) {
		const value = sourceHeaders.get(name);
		if (value !== null) headers.set(name, value);
	}
	if (isTransformedJsonPath(url.pathname)) {
		for (const name of CONDITIONAL_REQUEST_HEADERS) headers.delete(name);
	}
	headers.set('x-forwarded-host', url.hostname);
	headers.set('x-forwarded-proto', url.protocol.slice(0, -1));

	const clientIp = sourceHeaders.get('cf-connecting-ip');
	if (clientIp) headers.set('x-forwarded-for', clientIp);
	else headers.delete('x-forwarded-for');
	return headers;
}

function finiteNumber(value: unknown): number | null {
	const number = Number(value);
	return Number.isFinite(number) ? number : null;
}

function stringOrEmpty(value: unknown): string {
	return typeof value === 'string' ? value : '';
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

type LogValue = boolean | number | string | null;

function logError(event: string, details: Record<string, LogValue>, error?: unknown): void {
	const payload: Record<string, LogValue> = {
		level: 'error',
		event,
		...details,
	};
	if (error !== undefined) payload.errorType = error instanceof Error ? error.name : typeof error;
	console.error(JSON.stringify(payload));
}
