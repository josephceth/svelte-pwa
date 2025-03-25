<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		mdiArrowLeft,
		mdiMapMarker,
		mdiCalendar,
		mdiAccount,
		mdiOfficeBuilding,
		mdiTextBox
	} from '@mdi/js';

	// Get the data from the load function
	export let data;

	$: workOrder = data.workOrder;
	$: error = data.error;
	$: id = $page.url.searchParams.get('id');

	console.log('workOrder', workOrder);

	// Format date and time
	function formatDateTime(dateString: string) {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		}).format(date);
	}

	// Function to handle back navigation
	function handleBack() {
		goto('/');
	}
</script>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<div class="bg-[#00293d] px-4 py-4 text-white shadow-lg">
		<div class="flex items-center gap-4">
			<button
				class="flex items-center justify-center rounded-full p-2 hover:bg-white/10"
				on:click={handleBack}
			>
				<svg viewBox="0 0 24 24" class="h-6 w-6">
					<path fill="currentColor" d={mdiArrowLeft} />
				</svg>
			</button>
			{#if id}
				<div>
					<h1 class="text-xl font-semibold">Work Order {id}</h1>
					{#if workOrder}
						<p class="text-sm opacity-80">{workOrder.clientName}</p>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<div class="container mx-auto p-4">
		{#if error}
			<div class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
				{error}
			</div>
		{:else if workOrder}
			<div class="space-y-4">
				<!-- Client & Location Section -->
				<div class="rounded-lg bg-white p-4 shadow-sm">
					<div class="space-y-3">
						<div class="flex items-center gap-2 text-gray-700">
							<svg viewBox="0 0 24 24" class="h-5 w-5 text-[#95c11f]">
								<path fill="currentColor" d={mdiAccount} />
							</svg>
							<span class="font-medium">{workOrder.clientName}</span>
						</div>
						<div class="flex items-center gap-2 text-gray-700">
							<svg viewBox="0 0 24 24" class="h-5 w-5 text-[#95c11f]">
								<path fill="currentColor" d={mdiOfficeBuilding} />
							</svg>
							<span>{workOrder.locationName}</span>
						</div>
					</div>
				</div>

				<!-- Address Section -->
				<div class="rounded-lg bg-white p-4 shadow-sm">
					<a
						href={`https://maps.google.com?q=${encodeURIComponent(
							`${workOrder.address.street}, ${workOrder.address.city}, ${workOrder.address.state} ${workOrder.address.zipCode}`
						)}`}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-start gap-2 text-gray-700 hover:text-[#95c11f]"
					>
						<svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 text-[#95c11f]">
							<path fill="currentColor" d={mdiMapMarker} />
						</svg>
						<span>
							{workOrder.address.street}<br />
							{workOrder.address.city}, {workOrder.address.state}
							{workOrder.address.zipCode}
						</span>
					</a>
				</div>

				<!-- Schedule Section -->
				<div class="rounded-lg bg-white p-4 shadow-sm">
					<div class="mb-2 flex items-center gap-2">
						<svg viewBox="0 0 24 24" class="h-5 w-5 text-[#95c11f]">
							<path fill="currentColor" d={mdiCalendar} />
						</svg>
						<span class="font-medium text-gray-800">Schedule</span>
					</div>
					<div class="space-y-1 pl-7 text-gray-600">
						<p>Start: {formatDateTime(workOrder.startDateTime)}</p>
						<p>End: {formatDateTime(workOrder.endDateTime)}</p>
					</div>
				</div>

				<!-- Description Section -->
				<div class="rounded-lg bg-white p-4 shadow-sm">
					<div class="mb-2 flex items-center gap-2">
						<svg viewBox="0 0 24 24" class="h-5 w-5 text-[#95c11f]">
							<path fill="currentColor" d={mdiTextBox} />
						</svg>
						<span class="font-medium text-gray-800">Description</span>
					</div>
					<p class="pl-7 text-gray-600">{workOrder.description}</p>
				</div>

				<!-- Action Buttons -->
				<div class="fixed right-0 bottom-0 left-0 bg-white p-4 shadow-lg">
					<div class="container mx-auto flex gap-3">
						<button class="btn h-12 flex-1 border-none bg-[#95c11f] text-white hover:bg-[#7da219]">
							Start Work
						</button>
						<button class="btn h-12 flex-1 border-none bg-[#00293d] text-white hover:bg-[#003b5c]">
							Complete
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Add padding to prevent content from being hidden behind fixed buttons */
	.container {
		padding-bottom: 80px;
	}
</style>
