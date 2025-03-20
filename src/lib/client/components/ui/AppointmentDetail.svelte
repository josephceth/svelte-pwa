<!-- AppointmentDetail.svelte -->
<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
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
	const formatTimeRange = (start: Date, end: Date) => {
		const dateFormat = new Intl.DateTimeFormat('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		});
		const timeFormat = new Intl.DateTimeFormat('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		});

		const date = dateFormat.format(start);
		const startTime = timeFormat.format(start);
		const endTime = timeFormat.format(end);

		return `${date} ${startTime} - ${endTime}`;
	};

	// Detect iOS device
	function isIOS() {
		if (!browser) return false;
		return (
			/iPad|iPhone|iPod/.test(navigator.userAgent) ||
			(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
		);
	}

	let mapsUrl: string;

	// Create Maps URL based on device
	$: {
		const address = `${appointment.address.street}, ${appointment.address.city}, ${appointment.address.state} ${appointment.address.zipCode}`;
		const encodedAddress = encodeURIComponent(address);

		if (isIOS()) {
			// Apple Maps URL format
			mapsUrl = `maps://?address=${encodedAddress}`;
		} else {
			// Google Maps URL format
			mapsUrl = `https://maps.google.com?q=${encodedAddress}`;
		}
	}

	function handleClose() {
		dispatch('close');
	}

	function viewLocationNotes() {
		// TODO: Implement location notes view
		console.log('View location notes');
	}

	function viewWorkOrderDetails() {
		goto(`/workorder?id=${appointment.workOrderId}`);
	}
</script>

<div class="w-full md:mx-auto md:max-w-lg">
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body gap-3">
			<!-- Header with Work Order ID and Close Button -->
			<div class="flex items-start justify-between">
				<div class="space-y-0.5">
					<h2 class="text-primary font-medium">{appointment.workOrderId}</h2>
					<h3 class="text-sm font-medium opacity-90">
						{appointment.clientName} - {appointment.title}
					</h3>
				</div>
				<button class="btn btn-circle btn-ghost btn-sm" on:click={handleClose}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
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

			<!-- Location Info -->
			<div class="flex flex-col">
				<span class="text-sm opacity-70">Location</span>
				<div class="dropdown">
					<div role="button" tabindex="0" class="group cursor-pointer">
						<div class="flex items-center gap-1">
							<span class="group-hover:text-primary text-base font-medium transition-colors">
								{appointment.locationName}
							</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="group-hover:text-primary text-base-content/70 h-4 w-4 transition-colors"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</div>
						<div class="group-hover:text-primary text-sm transition-colors">
							{appointment.address.street}<br />
							{appointment.address.city}, {appointment.address.state}
							{appointment.address.zipCode}
						</div>
					</div>
					<ul class="dropdown-content menu bg-neutral rounded-box z-[1] w-52 p-2 shadow-lg">
						<li>
							<a
								href={mapsUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="text-neutral-content hover:bg-neutral-focus"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
									<circle cx="12" cy="10" r="3" />
								</svg>
								Navigate
							</a>
						</li>
						<li>
							<button
								on:click={viewLocationNotes}
								class="text-neutral-content hover:bg-neutral-focus"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
									<polyline points="14 2 14 8 20 8" />
									<line x1="16" y1="13" x2="8" y2="13" />
									<line x1="16" y1="17" x2="8" y2="17" />
									<polyline points="10 9 9 9 8 9" />
								</svg>
								View Location Notes
							</button>
						</li>
					</ul>
				</div>
			</div>

			<!-- Time Info -->
			<div class="flex flex-col">
				<span class="text-sm opacity-70">Time</span>
				<span class="text-sm"
					>{formatTimeRange(appointment.startDateTime, appointment.endDateTime)}</span
				>
			</div>

			<!-- Action Buttons -->
			<div class="card-actions mt-2 justify-stretch">
				<button class="btn btn-primary flex-1">On My Way</button>
				<button class="btn btn-outline flex-1" on:click={viewWorkOrderDetails}>View Details</button>
			</div>
		</div>
	</div>
</div>
