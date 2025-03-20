<!-- AppointmentDetail.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let appointment: {
		clientName: string;
		locationName: string;
		workOrderId: string;
		startDateTime: Date;
		endDateTime: Date;
		title: string;
		description: string;
		address: {
			street: string;
			city: string;
			state: string;
			zipCode: string;
		};
	};

	// Format date and time
	const formatDateTime = (date: Date) => {
		return new Intl.DateTimeFormat('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		}).format(date);
	};

	function handleClose() {
		dispatch('close');
	}
</script>

<div class="w-full md:mx-auto md:max-w-lg">
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body gap-4">
			<!-- Header with Work Order ID and Close Button -->
			<div class="flex items-center justify-between">
				<div>
					<h2 class="card-title text-primary">{appointment.workOrderId}</h2>
					<h3 class="mt-1 text-lg font-semibold">{appointment.title}</h3>
				</div>
				<button class="btn btn-circle btn-ghost" on:click={handleClose}>
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
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Description -->
			<div class="bg-base-200 rounded-lg p-3 text-sm">
				{appointment.description}
			</div>

			<!-- Client and Location Info -->
			<div class="grid gap-2">
				<div class="flex flex-col">
					<span class="text-sm opacity-70">Client</span>
					<span class="text-lg font-semibold">{appointment.clientName}</span>
				</div>
				<div class="flex flex-col">
					<span class="text-sm opacity-70">Location</span>
					<span class="text-lg font-semibold">{appointment.locationName}</span>
					<div class="text-sm">
						{appointment.address.street}<br />
						{appointment.address.city}, {appointment.address.state}
						{appointment.address.zipCode}
					</div>
				</div>
			</div>

			<!-- Time Info -->
			<div class="grid gap-2">
				<div class="flex flex-col">
					<span class="text-sm opacity-70">Start Time</span>
					<span>{formatDateTime(appointment.startDateTime)}</span>
				</div>
				<div class="flex flex-col">
					<span class="text-sm opacity-70">End Time</span>
					<span>{formatDateTime(appointment.endDateTime)}</span>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="card-actions mt-4 justify-stretch">
				<button class="btn btn-primary flex-1">Start Work</button>
				<button class="btn btn-outline flex-1">Reschedule</button>
			</div>
		</div>
	</div>
</div>
