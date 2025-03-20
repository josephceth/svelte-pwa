import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import mockData from '$lib/mock/workOrders.json';

export const GET: RequestHandler = async () => {
	return json(mockData.workOrders);
};
