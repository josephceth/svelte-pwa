<script lang="ts">
	import { projects } from '$lib/stores/projects';
</script>

<div class="rounded-lg bg-white p-6 shadow">
	<h1 class="mb-4 text-2xl font-bold">Stuff Page</h1>
	<p class="mb-4 text-gray-600">This is the stuff page, showing currently loaded projects:</p>

	<div class="space-y-2">
		{#each $projects as project}
			<div class="rounded border border-gray-200 bg-gray-50 p-3">
				<span class="font-medium">Project {project.id}:</span>
				{project.name}
			</div>
		{/each}
	</div>
</div>
