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

	// Appointment counter props - no defaults, they need to be supplied
	export let appointmentIndex: number | undefined = undefined;
	export let totalAppointments: number | undefined = undefined;

	// Derive appointment count display text
	$: appointmentCountText =
		appointmentIndex !== undefined && totalAppointments !== undefined
			? `Appointment ${appointmentIndex + 1} of ${totalAppointments} today`
			: '';

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

	function onMyWay() {
		// TODO: Implement on my way functionality
		console.log('On my way clicked');
	}

	function addNote() {
		// TODO: Implement add note functionality
		console.log('Add note clicked');
	}

	function addExpense() {
		// TODO: Implement add expense functionality
		console.log('Add expense clicked');
	}

	function getSignature() {
		// TODO: Implement get signature functionality
		console.log('Get signature clicked');
	}

	function takePictures() {
		// TODO: Implement take pictures functionality
		console.log('Take pictures clicked');
	}
</script>

<div class="w-full md:mx-auto md:max-w-lg">
	<div class="card overflow-hidden rounded-lg bg-white shadow-lg">
		<div class="bg-[#00293d] p-4 text-white">
			<div class="flex items-start justify-between">
				<div class="space-y-0.5">
					<h3 class="text-sm font-medium opacity-90">
						{appointment.clientName}
					</h3>
					<h2 class="text-lg font-medium">{appointment.title}</h2>
					{#if appointmentCountText}
						<p class="text-xs opacity-80">{appointmentCountText}</p>
					{/if}
				</div>
				<button class="text-white" on:click={handleClose}>
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
		</div>

		<div class="card-body gap-4 p-4">
			<!-- Address Section -->
			<div class="flex flex-col gap-1">
				<a
					href={mapsUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 text-gray-700 hover:text-[#95c11f]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-[#95c11f]"
						fill="none"
						viewBox="0 0 24 24"
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
					<span>
						{appointment.address.street}, {appointment.address.city}, {appointment.address.state}
						{appointment.address.zipCode}
					</span>
				</a>
			</div>

			<!-- Date/Time Section -->
			<div class="flex flex-col gap-1">
				<div class="flex items-center gap-2 text-gray-700">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-[#95c11f]"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<span>{formatTimeRange(appointment.startDateTime, appointment.endDateTime)}</span>
				</div>
			</div>

			<!-- Description Section -->
			<div class="py-2">
				<h3 class="mb-1 font-medium text-gray-800">Description</h3>
				<p class="text-sm text-gray-600">{appointment.description}</p>
			</div>

			<!-- Work Order ID Section -->
			<div class="flex flex-col gap-1">
				<div class="flex items-center gap-2 text-gray-700">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-[#95c11f]"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					<span class="font-medium">Work Order: {appointment.workOrderId}</span>
				</div>
			</div>

			<!-- Buttons Section -->
			<div class="grid w-full grid-cols-3 gap-3 pt-2">
				<button
					class="btn h-12 w-full border-none bg-[#95c11f] text-white hover:bg-[#7da219]"
					on:click={onMyWay}
				>
					On My Way
				</button>
				<button
					class="btn h-12 w-full border-none bg-[#00293d] text-white hover:bg-[#003b5c]"
					on:click={viewWorkOrderDetails}
				>
					View Details
				</button>

				<div class="dropdown dropdown-end dropdown-top w-full">
					<div
						tabindex="0"
						role="button"
						class="btn h-12 w-full border-none bg-gray-200 text-gray-700 hover:bg-gray-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
							/>
						</svg>
					</div>
					<ul
						tabindex="0"
						class="dropdown-content menu z-[10] w-56 rounded-lg bg-white p-2 shadow-xl"
					>
						<li>
							<button
								on:click={viewLocationNotes}
								class="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-50"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 text-[#95c11f]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								<span>View Location Notes</span>
							</button>
						</li>
						<li>
							<button
								on:click={addNote}
								class="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-50"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 text-[#95c11f]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
									/>
								</svg>
								<span>Add Note</span>
							</button>
						</li>
						<li>
							<button
								on:click={addExpense}
								class="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-50"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 text-[#95c11f]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>Add Expense</span>
							</button>
						</li>
						<li>
							<button
								on:click={getSignature}
								class="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-50"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 text-[#95c11f]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
									/>
								</svg>
								<span>Get Signature</span>
							</button>
						</li>
						<li>
							<button
								on:click={takePictures}
								class="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-50"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 text-[#95c11f]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<span>Take Pictures</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
