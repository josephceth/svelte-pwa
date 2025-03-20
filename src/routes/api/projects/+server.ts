import { json } from '@sveltejs/kit';

// Mock data - in a real app, this would come from your database
const projects = [
	{ id: 1, name: 'Project Alpha' },
	{ id: 2, name: 'Project Beta' },
	{ id: 3, name: 'Project Gamma' },
	{ id: 4, name: 'Project Delta' }
];

export async function GET() {
	return json(projects);
}
