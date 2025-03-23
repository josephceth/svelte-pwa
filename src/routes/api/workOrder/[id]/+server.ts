import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import mockData from '$lib/mock/workOrders.json';

export const GET: RequestHandler = async ({ params }) => {
	const workOrder = mockData.workOrders.find((wo) => wo.workOrderId === params.id);
	console.log('fetching work order in api code for ', params.id);
	if (!workOrder) {
		return new Response('Work order not found', { status: 404 });
	}

	return json(workOrder);
};
