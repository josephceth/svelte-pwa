import { goto } from '$app/navigation';
import { sessionData } from '$lib/stores/auth.svelte';
import type { Handle, HandleFetch } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('Session ID:', sessionData.sessionId);
	if (!sessionData.sessionId && !event.url.pathname.startsWith('/login')) {
		goto('/login');
		return await resolve(event);
	}

	return await resolve(event);
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	const sessionId = sessionData.sessionId;
	if (sessionId) {
		request.headers.set('session', sessionId);
	}
	return fetch(request);
};
