import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import mockData from '$lib/mock/workOrders.json';

export const GET: RequestHandler = async () => {
	console.log('fetching appointments');
	return json(mockData.workOrders);
};
