import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	const id = url.searchParams.get('id');

	if (!id) {
		return {
			workOrder: null,
			error: 'No work order ID provided'
		};
	}

	try {
		const response = await fetch(`/api/workOrder/${id}`);
		if (!response.ok) throw new Error('Work order not found');
		const workOrder = await response.json();

		return {
			workOrder
		};
	} catch (err) {
		return {
			workOrder: null,
			error: 'Failed to load work order'
		};
	}
};
