import { writable } from 'svelte/store';

export interface Project {
	id: number;
	name: string;
}

function createProjectsStore() {
	const { subscribe, set, update } = writable<Project[]>([]);

	return {
		subscribe,
		fetchProjects: async () => {
			try {
				const response = await fetch('/api/projects');
				const projects = await response.json();
				set(projects);
				// Store in localStorage as fallback for offline
				localStorage.setItem('cached_projects', JSON.stringify(projects));
			} catch (error) {
				console.error('Error fetching projects:', error);
				// Try to load from cache if fetch fails
				const cached = localStorage.getItem('cached_projects');
				if (cached) {
					set(JSON.parse(cached));
				}
			}
		}
	};
}

export const projects = createProjectsStore();
