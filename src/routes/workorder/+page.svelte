<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Get the data from the load function
	export let data;

	$: workOrder = data.workOrder;
	$: error = data.error;
	$: id = $page.url.searchParams.get('id');

	console.log('workOrder', workOrder);

	// Function to handle back navigation
	function handleBack() {
		goto('/');
	}
</script>

<div class="container mx-auto p-4">
	<div class="mb-6 flex items-center gap-4">
		<button class="btn btn-ghost" on:click={handleBack}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			Back
		</button>
		{#if id}
			<h1 class="text-2xl font-bold">Work Order {id}</h1>
		{/if}
	</div>

	{#if error}
		<div class="alert alert-error">
			{error}
		</div>
	{:else if workOrder}
		<div class="card bg-base-200">
			<div class="card-body">
				<h2 class="card-title">{workOrder.title}</h2>
				<p class="text-base-content/70 text-sm">Client: {workOrder.clientName}</p>
				<p class="text-base-content/70 text-sm">Location: {workOrder.locationName}</p>
				<p class="text-base-content/70 text-sm">
					Address: {workOrder.address.street}, {workOrder.address.city}, {workOrder.address.state}
					{workOrder.address.zipCode}
				</p>
				<p class="text-base-content/70 text-sm">Start Date: {workOrder.startDateTime}</p>
				<p class="text-base-content/70 text-sm">End Date: {workOrder.endDateTime}</p>
				<p class="text-base-content/70 text-sm">Description: {workOrder.description}</p>
			</div>
		</div>
	{/if}
</div>
