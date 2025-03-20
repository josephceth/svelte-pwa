import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const response = await fetch('/api/user/appointments');
	const appointments = await response.json();

	return { appointments };
};
