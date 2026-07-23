import GALLERY_HTML from './gallery.js';

const ORIGIN_URL = 'http://127.0.0.1:9090';
const DENY_BODY = 'Share access only';
const SAFE_METHODS = new Set(['GET', 'HEAD']);
const ALWAYS_FRESH_API_PATHS = new Set(['/api/timeline/buckets', '/api/timeline/bucket']);
const JSON_API_PATHS = new Set(['/api/shared-links/me', ...ALWAYS_FRESH_API_PATHS]);
const THUMBNAIL_SIZES = new Set(['preview', 'thumbnail']);
const ASSET_PATH = /^\/api\/assets\/[^/]+$/;
const THUMBNAIL_PATH = /^\/api\/assets\/[^/]+\/thumbnail$/;
const SHARE_PATH = /^\/share\/([^/]+)\/?$/;
const SHARE_KEY = /^[A-Za-z0-9_-]{20,256}$/;
const PRIVATE_REQUEST_HEADERS = [
	'accept-encoding',
	'authorization',
	'cookie',
	'x-api-key',
	'x-immich-share-key',
	'x-immich-share-slug',
	'x-immich-session-token',
	'x-immich-user-token',
];
const CONDITIONAL_REQUEST_HEADERS = ['if-match', 'if-modified-since', 'if-none-match', 'if-range', 'if-unmodified-since'];
const PRIVATE_RESPONSE_HEADERS = ['content-disposition', 'location', 'set-cookie'];
const CACHE_RESPONSE_HEADERS = [
	'age',
	'cache-control',
	'cache-tag',
	'cdn-cache-control',
	'cloudflare-cdn-cache-control',
	'expires',
	'vary',
];
const FORWARDED_QUERY_PARAMS = new Map([
	['/api/timeline/buckets', ['albumId', 'order']],
	['/api/timeline/bucket', ['albumId', 'order', 'timeBucket']],
]);
const NO_STORE_HEADERS = {
	'cache-control': 'no-store',
	'x-content-type-options': 'nosniff',
};

export default { fetch: handleRequest };

async function handleRequest(request, env) {
	const url = new URL(request.url);
	const { pathname, searchParams } = url;
	const method = request.method.toUpperCase();

	if (pathname === '/favicon.ico') {
		return SAFE_METHODS.has(method) ? forwardPublicAsset(request, env, url) : forbidden();
	}

	if (pathname.startsWith('/api/')) {
		return isAllowedApi(pathname, method, searchParams) ? forwardApi(request, env, url) : forbidden();
	}

	return SAFE_METHODS.has(method) && shareKeyFromPath(pathname) ? galleryResponse(method === 'HEAD') : forbidden();
}

async function forwardPublicAsset(request, env, requestUrl) {
	const targetUrl = new URL(requestUrl.pathname + requestUrl.search, ORIGIN_URL);
	const response = await fetchUpstream(request, env, requestUrl, targetUrl);
	return response ? sanitizeUpstreamResponse(response) : upstreamErrorResponse(502);
}

async function forwardApi(request, env, requestUrl) {
	const bypassCache = ALWAYS_FRESH_API_PATHS.has(requestUrl.pathname);
	const transformsJson = isTransformedJsonPath(requestUrl.pathname);
	const response = await fetchUpstream(request, env, requestUrl, buildTargetUrl(requestUrl), bypassCache);

	if (!response) return upstreamErrorResponse(502);
	if (response.status === 304) {
		return transformsJson ? upstreamErrorResponse(502) : sanitizeUpstreamResponse(response, bypassCache);
	}
	if (!response.ok) return upstreamErrorResponse(response.status);
	if (requestUrl.pathname === '/api/shared-links/me') return sanitizeSharedLinkResponse(response);
	if (ASSET_PATH.test(requestUrl.pathname)) return sanitizeAssetResponse(response);
	return sanitizeUpstreamResponse(response, bypassCache);
}

async function fetchUpstream(request, env, requestUrl, targetUrl, bypassCache = false) {
	try {
		return await env.NAS.fetch(targetUrl, {
			method: request.method,
			headers: sanitizeHeaders(request.headers, requestUrl),
			redirect: 'manual',
			...(bypassCache ? { cache: 'no-store' } : {}),
		});
	} catch (error) {
		console.error('Immich request failed', error);
		return null;
	}
}

function galleryResponse(headOnly) {
	return new Response(headOnly ? null : GALLERY_HTML, {
		status: 200,
		headers: {
			...NO_STORE_HEADERS,
			'content-security-policy':
				"default-src 'none'; connect-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
			'content-type': 'text/html; charset=utf-8',
			'referrer-policy': 'no-referrer',
		},
	});
}

function forbidden() {
	return textResponse(DENY_BODY, 403);
}

function isAllowedApi(pathname, method, searchParams) {
	if (!isValidShareKey(searchParams.get('key'))) return false;
	if (method === 'GET' && (JSON_API_PATHS.has(pathname) || ASSET_PATH.test(pathname))) {
		return true;
	}
	return SAFE_METHODS.has(method) && THUMBNAIL_PATH.test(pathname) && THUMBNAIL_SIZES.has(searchParams.get('size'));
}

async function sanitizeSharedLinkResponse(response) {
	const payload = await readJson(response);
	if (!payload?.album || typeof payload.album.id !== 'string') {
		return upstreamErrorResponse(502);
	}

	return jsonResponse(
		{
			album: {
				id: payload.album.id,
				albumName: stringOrEmpty(payload.album.albumName),
				order: payload.album.order === 'asc' ? 'asc' : 'desc',
			},
			showMetadata: payload.showMetadata === true,
		},
		response.headers,
	);
}

async function sanitizeAssetResponse(response) {
	const payload = await readJson(response);
	if (!payload || typeof payload.id !== 'string') return upstreamErrorResponse(502);

	return jsonResponse(
		{
			id: payload.id,
			width: finiteNumber(payload.width),
			height: finiteNumber(payload.height),
			originalFileName: stringOrEmpty(payload.originalFileName),
			exifInfo: {
				description: stringOrEmpty(payload.exifInfo?.description),
			},
		},
		response.headers,
	);
}

async function readJson(response) {
	try {
		return await response.json();
	} catch {
		return null;
	}
}

function jsonResponse(payload, sourceHeaders) {
	const headers = new Headers({
		'content-type': 'application/json; charset=utf-8',
		'x-content-type-options': 'nosniff',
	});
	for (const name of CACHE_RESPONSE_HEADERS) {
		const value = sourceHeaders.get(name);
		if (value !== null) headers.set(name, value);
	}
	return new Response(JSON.stringify(payload), {
		status: 200,
		headers,
	});
}

function sanitizeUpstreamResponse(response, bypassCache = false) {
	const headers = new Headers(response.headers);
	for (const name of PRIVATE_RESPONSE_HEADERS) headers.delete(name);
	if (bypassCache) {
		headers.set('cache-control', 'no-store');
		headers.delete('cdn-cache-control');
		headers.delete('cloudflare-cdn-cache-control');
		headers.delete('expires');
	}
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

function upstreamErrorResponse(status) {
	const safeStatus = status >= 400 && status <= 599 ? status : 502;
	return textResponse('Immich request failed', safeStatus, NO_STORE_HEADERS);
}

function textResponse(body, status, extraHeaders = {}) {
	return new Response(body, {
		status,
		headers: {
			...extraHeaders,
			'content-type': 'text/plain; charset=utf-8',
			'x-content-type-options': 'nosniff',
		},
	});
}

function buildTargetUrl(requestUrl) {
	const targetUrl = new URL(requestUrl.pathname, ORIGIN_URL);
	const isThumbnail = THUMBNAIL_PATH.test(requestUrl.pathname);
	const names = isThumbnail ? ['size', 'c'] : (FORWARDED_QUERY_PARAMS.get(requestUrl.pathname) ?? []);

	for (const name of names) {
		const value = requestUrl.searchParams.get(name);
		if (value) targetUrl.searchParams.set(name, value);
	}
	if (isThumbnail) targetUrl.searchParams.set('edited', 'true');
	targetUrl.searchParams.set('key', requestUrl.searchParams.get('key'));
	return targetUrl;
}

function shareKeyFromPath(pathname) {
	const match = pathname.match(SHARE_PATH);
	if (!match) return '';
	try {
		const key = decodeURIComponent(match[1]);
		return isValidShareKey(key) ? key : '';
	} catch {
		return '';
	}
}

function isValidShareKey(key) {
	return typeof key === 'string' && SHARE_KEY.test(key);
}

function isTransformedJsonPath(pathname) {
	return pathname === '/api/shared-links/me' || ASSET_PATH.test(pathname);
}

function sanitizeHeaders(sourceHeaders, url) {
	const headers = new Headers(sourceHeaders);
	for (const name of PRIVATE_REQUEST_HEADERS) headers.delete(name);
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

function finiteNumber(value) {
	const number = Number(value);
	return Number.isFinite(number) ? number : null;
}

function stringOrEmpty(value) {
	return typeof value === 'string' ? value : '';
}
