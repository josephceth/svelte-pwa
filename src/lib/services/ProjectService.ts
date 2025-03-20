async function getProjects() {
	const response = await fetch('${techtrackURL}/api/pwa/projects');
	const projects = await response.json();
	return projects;
}
