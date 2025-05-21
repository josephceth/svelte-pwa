import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { sessionData } from '$lib/stores/auth.svelte';

export const ssr = false;
export const load: LayoutLoad = async ({ fetch, url }) => {
	// if (!sessionData.sessionId && !url.pathname.startsWith('/login')) {
	// 	redirect(302, '/login');
	// }
	console.log('loading layout');
	const response = await fetch('/api/user/appointments');
	const appointments = await response.json();

	// Pre-fetch and cache each work order
	await Promise.all(
		appointments.map(async (appointment: { workOrderId: string }) => {
			try {
				await fetch(`/api/workOrder/${appointment.workOrderId}`);
			} catch (error) {
				console.error(`Failed to pre-fetch work order ${appointment.workOrderId}:`, error);
			}
		})
	);

	return { appointments };
};
