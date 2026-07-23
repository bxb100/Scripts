import { afterEach, describe, expect, it, vi } from 'vitest';

import worker from './index.js';

const PUBLIC_ORIGIN = 'https://share.example';
const VALID_KEY = 'AbCdEfGhIjKlMnOpQrSt';

function createEnv(handler = () => new Response('ok')) {
	const fetch = vi.fn(handler);
	return {
		env: { NAS: { fetch } },
		fetch,
	};
}

function dispatch(path, env, init) {
	return worker.fetch(new Request(`${PUBLIC_ORIGIN}${path}`, init), env);
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe('gallery routes', () => {
	it('serves valid gallery GET and HEAD requests without using the upstream', async () => {
		const { env, fetch } = createEnv();

		const getResponse = await dispatch(`/share/${VALID_KEY}`, env);
		const headResponse = await dispatch(`/share/${VALID_KEY}/`, env, { method: 'HEAD' });

		expect(getResponse.status).toBe(200);
		expect(getResponse.headers.get('content-type')).toBe('text/html; charset=utf-8');
		expect(await getResponse.text()).toContain('<title>Photo Gallery</title>');
		expect(headResponse.status).toBe(200);
		expect(await headResponse.text()).toBe('');
		expect(fetch).not.toHaveBeenCalled();
	});

	it.each([
		['GET', '/'],
		['GET', '/share/too-short'],
		['GET', `/share/${VALID_KEY}/extra`],
		['GET', `/share/${VALID_KEY}%2Fextra`],
		['POST', `/share/${VALID_KEY}`],
	])('rejects %s %s', async (method, path) => {
		const { env, fetch } = createEnv();

		const response = await dispatch(path, env, { method });

		expect(response.status).toBe(403);
		expect(await response.text()).toBe('Share access only');
		expect(fetch).not.toHaveBeenCalled();
	});
});

describe('API allowlist', () => {
	it.each([
		['GET', `/api/timeline/buckets?key=${VALID_KEY}`],
		['GET', `/api/assets/asset-id/thumbnail?key=${VALID_KEY}&size=preview`],
		['HEAD', `/api/assets/asset-id/thumbnail?key=${VALID_KEY}&size=thumbnail`],
	])('allows %s %s', async (method, path) => {
		const { env, fetch } = createEnv(() => new Response(null));

		const response = await dispatch(path, env, { method });

		expect(response.status).toBe(200);
		expect(fetch).toHaveBeenCalledOnce();
	});

	it.each([
		['GET', '/api/timeline/buckets'],
		['GET', '/api/timeline/buckets?key=invalid'],
		['HEAD', `/api/timeline/buckets?key=${VALID_KEY}`],
		['POST', `/api/timeline/bucket?key=${VALID_KEY}`],
		['GET', `/api/assets/asset-id/thumbnail?key=${VALID_KEY}&size=small`],
		['GET', `/api/assets/asset-id/thumbnail?key=${VALID_KEY}&size=original`],
		['GET', `/api/assets/asset-id/thumbnail?key=${VALID_KEY}&size=fullsize`],
		['DELETE', `/api/assets/asset-id/thumbnail?key=${VALID_KEY}&size=fullsize`],
		['GET', `/api/not-allowed?key=${VALID_KEY}`],
	])('rejects %s %s', async (method, path) => {
		const { env, fetch } = createEnv();

		const response = await dispatch(path, env, { method });

		expect(response.status).toBe(403);
		expect(fetch).not.toHaveBeenCalled();
	});
});

describe('upstream request sanitization', () => {
	it('forwards only allowlisted timeline query parameters and safe headers', async () => {
		const { env, fetch } = createEnv(
			() =>
				new Response('[]', {
					headers: {
						'cache-control': 'public, max-age=3600',
						'cdn-cache-control': 'public, max-age=7200',
						'cloudflare-cdn-cache-control': 'public, max-age=10800',
						etag: '"timeline-etag"',
						expires: 'Thu, 23 Jul 2026 06:00:00 GMT',
					},
				}),
		);
		const requestHeaders = {
			accept: 'application/json',
			'accept-encoding': 'br',
			authorization: 'Bearer secret',
			'cf-connecting-ip': '203.0.113.8',
			cookie: 'session=secret',
			'x-api-key': 'secret',
			'x-forwarded-for': '198.51.100.3',
			'x-immich-share-key': 'private-share-key',
			'x-immich-share-slug': 'private-share-slug',
			'x-immich-session-token': 'secret',
			'x-immich-user-token': 'secret',
		};
		const path = `/api/timeline/bucket?key=${VALID_KEY}` + '&albumId=album-1&order=asc&timeBucket=2026-07-01' + '&internal=true';

		const response = await dispatch(path, env, { headers: requestHeaders });

		expect(response.status).toBe(200);
		expect(response.headers.get('cache-control')).toBe('no-store');
		expect(response.headers.get('cdn-cache-control')).toBeNull();
		expect(response.headers.get('cloudflare-cdn-cache-control')).toBeNull();
		expect(response.headers.get('expires')).toBeNull();
		expect(response.headers.get('etag')).toBe('"timeline-etag"');
		const [target, options] = fetch.mock.calls[0];
		const targetUrl = new URL(target);
		expect(targetUrl.origin).toBe('http://127.0.0.1:9090');
		expect(targetUrl.pathname).toBe('/api/timeline/bucket');
		expect(Object.fromEntries(targetUrl.searchParams)).toEqual({
			albumId: 'album-1',
			order: 'asc',
			timeBucket: '2026-07-01',
			key: VALID_KEY,
		});
		expect(options).toMatchObject({
			method: 'GET',
			redirect: 'manual',
			cache: 'no-store',
		});
		expect(options.headers.get('accept')).toBe('application/json');
		expect(options.headers.get('x-forwarded-host')).toBe('share.example');
		expect(options.headers.get('x-forwarded-proto')).toBe('https');
		expect(options.headers.get('x-forwarded-for')).toBe('203.0.113.8');
		for (const name of [
			'accept-encoding',
			'authorization',
			'cookie',
			'x-api-key',
			'x-immich-share-key',
			'x-immich-share-slug',
			'x-immich-session-token',
			'x-immich-user-token',
		]) {
			expect(options.headers.has(name)).toBe(false);
		}
	});

	it('derives the thumbnail query without forwarding unrelated values', async () => {
		const { env, fetch } = createEnv(() => new Response(null));

		await dispatch(`/api/assets/asset-id/thumbnail?key=${VALID_KEY}` + '&size=thumbnail&c=cache-key&edited=false&private=value', env);

		const [target, options] = fetch.mock.calls[0];
		expect(Object.fromEntries(new URL(target).searchParams)).toEqual({
			size: 'thumbnail',
			c: 'cache-key',
			edited: 'true',
			key: VALID_KEY,
		});
		expect(options).not.toHaveProperty('cache');
	});
});

describe('upstream response sanitization', () => {
	it('returns only allowlisted shared-link fields', async () => {
		const upstreamPayload = {
			album: {
				id: 'album-1',
				albumName: 'Trip',
				order: 'unexpected',
				assetCount: '12',
				owner: { email: 'private@example.com' },
				sharedUsers: [{ id: 'private-user' }],
			},
			showMetadata: true,
			key: 'private-key',
			password: 'private-password',
		};
		const { env, fetch } = createEnv(() =>
			Response.json(upstreamPayload, {
				headers: {
					'cache-control': 'public, max-age=120',
					'cdn-cache-control': 'public, max-age=300',
					etag: '"shared-link-etag"',
					'set-cookie': 'session=secret',
				},
			}),
		);

		const response = await dispatch(`/api/shared-links/me?key=${VALID_KEY}`, env, {
			headers: {
				'if-modified-since': 'Thu, 23 Jul 2026 04:00:00 GMT',
				'if-none-match': '"shared-link-etag"',
			},
		});

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			album: {
				id: 'album-1',
				albumName: 'Trip',
				order: 'desc',
			},
			showMetadata: true,
		});
		expect(response.headers.get('set-cookie')).toBeNull();
		expect(response.headers.get('cache-control')).toBe('public, max-age=120');
		expect(response.headers.get('cdn-cache-control')).toBe('public, max-age=300');
		expect(response.headers.get('etag')).toBeNull();
		const [, options] = fetch.mock.calls[0];
		expect(options.headers.has('if-modified-since')).toBe(false);
		expect(options.headers.has('if-none-match')).toBe(false);
	});

	it('returns only allowlisted asset fields', async () => {
		const upstreamPayload = {
			id: 'asset-1',
			width: '1920',
			height: 'invalid',
			originalFileName: 'photo.jpg',
			originalPath: '/private/upload/photo.jpg',
			ownerId: 'private-owner',
			exifInfo: {
				description: 'Mountain',
				latitude: 12.34,
				longitude: 56.78,
				make: 'Private Camera',
			},
		};
		const { env, fetch } = createEnv(() =>
			Response.json(upstreamPayload, {
				headers: {
					'cache-control': 'private, max-age=60',
					'last-modified': 'Thu, 23 Jul 2026 04:00:00 GMT',
					vary: 'accept',
				},
			}),
		);

		const response = await dispatch(`/api/assets/asset-1?key=${VALID_KEY}`, env, {
			headers: { 'if-modified-since': 'Thu, 23 Jul 2026 04:00:00 GMT' },
		});

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			id: 'asset-1',
			width: 1920,
			height: null,
			originalFileName: 'photo.jpg',
			exifInfo: {
				description: 'Mountain',
			},
		});
		expect(response.headers.get('cache-control')).toBe('private, max-age=60');
		expect(response.headers.get('last-modified')).toBeNull();
		expect(response.headers.get('vary')).toBe('accept');
		const [, options] = fetch.mock.calls[0];
		expect(options.headers.has('if-modified-since')).toBe(false);
	});

	it('removes sensitive headers from media responses', async () => {
		const { env } = createEnv(
			() =>
				new Response('image', {
					status: 206,
					headers: {
						'cache-control': 'public, max-age=60',
						'cache-tag': 'album-1',
						'cdn-cache-control': 'public, max-age=120',
						'cloudflare-cdn-cache-control': 'public, max-age=300',
						'content-disposition': 'attachment; filename="private.jpg"',
						'content-type': 'image/jpeg',
						etag: '"asset-etag"',
						expires: 'Thu, 23 Jul 2026 06:00:00 GMT',
						location: 'https://private.example/asset',
						'set-cookie': 'session=secret',
						vary: 'accept',
					},
				}),
		);

		const response = await dispatch(`/api/assets/asset-1/thumbnail?key=${VALID_KEY}&size=preview`, env);

		expect(response.status).toBe(206);
		expect(new TextDecoder().decode(await response.arrayBuffer())).toBe('image');
		expect(response.headers.get('content-type')).toBe('image/jpeg');
		expect(response.headers.get('cache-control')).toBe('public, max-age=60');
		expect(response.headers.get('cache-tag')).toBe('album-1');
		expect(response.headers.get('cdn-cache-control')).toBe('public, max-age=120');
		expect(response.headers.get('cloudflare-cdn-cache-control')).toBe('public, max-age=300');
		expect(response.headers.get('etag')).toBe('"asset-etag"');
		expect(response.headers.get('expires')).toBe('Thu, 23 Jul 2026 06:00:00 GMT');
		expect(response.headers.get('vary')).toBe('accept');
		for (const name of ['content-disposition', 'location', 'set-cookie']) {
			expect(response.headers.has(name)).toBe(false);
		}
	});

	it('passes through sanitized 304 responses', async () => {
		const { env } = createEnv(
			() =>
				new Response(null, {
					status: 304,
					headers: {
						'cache-control': 'public, max-age=60',
						'cloudflare-cdn-cache-control': 'public, max-age=300',
						etag: '"asset-etag"',
						'set-cookie': 'session=secret',
					},
				}),
		);

		const response = await dispatch(`/api/assets/asset-1/thumbnail?key=${VALID_KEY}&size=preview`, env, {
			headers: { 'if-none-match': '"asset-etag"' },
		});

		expect(response.status).toBe(304);
		expect(response.headers.get('cache-control')).toBe('public, max-age=60');
		expect(response.headers.get('cloudflare-cdn-cache-control')).toBe('public, max-age=300');
		expect(response.headers.get('etag')).toBe('"asset-etag"');
		expect(response.headers.get('set-cookie')).toBeNull();
	});

	it('keeps timeline 304 responses uncached', async () => {
		const { env } = createEnv(
			() =>
				new Response(null, {
					status: 304,
					headers: {
						'cache-control': 'public, max-age=3600',
						'cdn-cache-control': 'public, max-age=7200',
						'cloudflare-cdn-cache-control': 'public, max-age=10800',
						etag: '"timeline-etag"',
						expires: 'Thu, 23 Jul 2026 06:00:00 GMT',
					},
				}),
		);

		const response = await dispatch(`/api/timeline/buckets?key=${VALID_KEY}`, env, {
			headers: { 'if-none-match': '"timeline-etag"' },
		});

		expect(response.status).toBe(304);
		expect(response.headers.get('cache-control')).toBe('no-store');
		expect(response.headers.get('cdn-cache-control')).toBeNull();
		expect(response.headers.get('cloudflare-cdn-cache-control')).toBeNull();
		expect(response.headers.get('expires')).toBeNull();
		expect(response.headers.get('etag')).toBe('"timeline-etag"');
	});

	it('maps upstream redirects to safe errors', async () => {
		const { env } = createEnv(
			() =>
				new Response(null, {
					status: 302,
					headers: { location: 'https://private.example/asset' },
				}),
		);

		const response = await dispatch(`/api/assets/asset-1/thumbnail?key=${VALID_KEY}&size=preview`, env);

		expect(response.status).toBe(502);
		expect(response.headers.get('location')).toBeNull();
		expect(await response.text()).toBe('Immich request failed');
	});

	it('maps upstream exceptions and error responses to safe errors', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});
		const thrown = createEnv(() => {
			throw new Error('private upstream failure');
		});
		const unavailable = createEnv(
			() =>
				new Response('private upstream body', {
					status: 503,
					headers: { 'set-cookie': 'session=secret' },
				}),
		);

		const thrownResponse = await dispatch(`/api/timeline/buckets?key=${VALID_KEY}`, thrown.env);
		const unavailableResponse = await dispatch(`/api/timeline/buckets?key=${VALID_KEY}`, unavailable.env);

		expect(thrownResponse.status).toBe(502);
		expect(await thrownResponse.text()).toBe('Immich request failed');
		expect(thrownResponse.headers.get('cache-control')).toBe('no-store');
		expect(unavailableResponse.status).toBe(503);
		expect(await unavailableResponse.text()).toBe('Immich request failed');
		expect(unavailableResponse.headers.get('set-cookie')).toBeNull();
	});
});
