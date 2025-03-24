<!-- AppointmentDetail.svelte -->
<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		mdiClose, // For close button
		mdiMapMarker, // For location
		mdiCalendar, // For date/time
		mdiFileDocument, // For work order
		mdiDotsHorizontal, // For more options menu
		mdiNoteText, // For location notes
		mdiPencil, // For add note
		mdiCurrencyUsd, // For expenses
		mdiPen, // For signature
		mdiCamera // For pictures
	} from '@mdi/js';
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
					<svg viewBox="0 0 24 24" class="h-6 w-6">
						<path fill="currentColor" d={mdiClose} />
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
					<svg viewBox="0 0 24 24" class="h-5 w-5 text-[#95c11f]">
						<path fill="currentColor" d={mdiMapMarker} />
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
					<svg viewBox="0 0 24 24" class="h-5 w-5 text-[#95c11f]">
						<path fill="currentColor" d={mdiCalendar} />
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
					<svg viewBox="0 0 24 24" class="h-5 w-5 text-[#95c11f]">
						<path fill="currentColor" d={mdiFileDocument} />
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
						<svg viewBox="0 0 24 24" class="h-5 w-5">
							<path fill="currentColor" d={mdiDotsHorizontal} />
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
								<svg viewBox="0 0 24 24" class="h-5 w-5 text-[#95c11f]">
									<path fill="currentColor" d={mdiNoteText} />
								</svg>
								<span>View Location Notes</span>
							</button>
						</li>
						<li>
							<button
								on:click={addNote}
								class="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-50"
							>
								<svg viewBox="0 0 24 24" class="h-5 w-5 text-[#95c11f]">
									<path fill="currentColor" d={mdiPencil} />
								</svg>
								<span>Add Note</span>
							</button>
						</li>
						<li>
							<button
								on:click={addExpense}
								class="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-50"
							>
								<svg viewBox="0 0 24 24" class="h-5 w-5 text-[#95c11f]">
									<path fill="currentColor" d={mdiCurrencyUsd} />
								</svg>
								<span>Add Expense</span>
							</button>
						</li>
						<li>
							<button
								on:click={getSignature}
								class="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-50"
							>
								<svg viewBox="0 0 24 24" class="h-5 w-5 text-[#95c11f]">
									<path fill="currentColor" d={mdiPen} />
								</svg>
								<span>Get Signature</span>
							</button>
						</li>
						<li>
							<button
								on:click={takePictures}
								class="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-50"
							>
								<svg viewBox="0 0 24 24" class="h-5 w-5 text-[#95c11f]">
									<path fill="currentColor" d={mdiCamera} />
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
