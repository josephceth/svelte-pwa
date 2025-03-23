/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];
const API_CACHE = 'api-cache-v1';

// Add API routes to cache
const API_ROUTES = ['/api/user/appointments'];
const API_PATTERNS = [
	/^\/api\/workOrder\/[^/]+$/ // Matches /api/workOrder/any-id
];

self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
		console.log('Files added to cache');
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE && key !== API_CACHE) {
				await caches.delete(key);
			}
		}
	}
	event.waitUntil(deleteOldCaches());
});

self.addEventListener('message', (event) => {
	if (event.data === 'skipWaiting') {
		self.skipWaiting();
	}
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);

		// Handle API routes
		if (
			API_ROUTES.includes(url.pathname) ||
			API_PATTERNS.some((pattern) => pattern.test(url.pathname))
		) {
			const apiCache = await caches.open(API_CACHE);
			try {
				const response = await fetch(event.request);
				if (response.ok) {
					console.log('caching response for:', url.pathname);
					apiCache.put(event.request, response.clone());
					return response;
				}
			} catch {
				console.log('no response, checking cache for:', url.pathname);
				const cachedResponse = await apiCache.match(event.request);
				if (cachedResponse) {
					console.log('returning cached response for:', url.pathname);
					return cachedResponse;
				}
			}
		}

		// Handle static assets
		const cache = await caches.open(CACHE);
		if (ASSETS.includes(url.pathname)) {
			const cachedResponse = await cache.match(url.pathname);
			if (cachedResponse) return cachedResponse;
		}

		try {
			const response = await fetch(event.request);
			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}
			return response;
		} catch {
			const cachedResponse = await cache.match(url.pathname);
			if (cachedResponse) return cachedResponse;
			return new Response('Not found', { status: 404 });
		}
	}

	event.respondWith(respond());
});
