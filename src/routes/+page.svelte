<script lang="ts">
	import AppointmentCard from '$lib/client/components/ui/AppointmentCard.svelte';
	import AppointmentDetail from '$lib/client/components/ui/AppointmentDetail.svelte';
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	interface Address {
		street: string;
		city: string;
		state: string;
		zipCode: string;
	}

	interface Appointment {
		clientName: string;
		locationName: string;
		workOrderId: string;
		startDateTime: Date;
		endDateTime: Date;
		title: string;
		description: string;
		address: Address;
	}

	// Get data from layout
	const { data } = $props();

	// Process appointments data with Svelte 5 runes
	const appointments = $derived(
		data.appointments.map((apt: Partial<Appointment>) => ({
			...apt,
			startDateTime: new Date(apt.startDateTime!),
			endDateTime: new Date(apt.endDateTime!)
		}))
	);

	// Format today's date
	const today = new Date();
	const formattedDate = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	}).format(today);

	// Get today's appointments count using $derived
	const todaysAppointments = $derived(
		appointments.filter(
			(apt: Appointment) => apt.startDateTime.toDateString() === today.toDateString()
		)
	);

	// Use $state for component state
	let selectedAppointment = $state<(typeof appointments)[0] | null>(null);
	let isOnline = $state(true); // Default to true, will be updated in onMount

	onMount(() => {
		// Set initial online status
		isOnline = navigator.onLine;

		// Listen for online/offline events
		const handleOnline = () => (isOnline = true);
		const handleOffline = () => (isOnline = false);

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	});

	function handleAppointmentClick(appointment: (typeof appointments)[0]) {
		selectedAppointment = selectedAppointment === appointment ? null : appointment;
	}
</script>

<div class="flex w-full flex-col">
	<!-- Header Section - Full width with dark blue background -->
	<div class="flex w-full items-center justify-between bg-[#00293d] px-4 py-4 text-white">
		<!-- Settings gear on the left -->
		<button class="text-white">
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
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
		</button>

		<!-- Centered text -->
		<div class="text-center">
			<h1 class="text-lg font-medium">{formattedDate}</h1>
			<p class="text-base opacity-90">{appointments.length} visits today</p>
		</div>

		<!-- Notification bell and online status on the right -->
		<div class="flex items-center gap-4">
			<div class="flex items-center gap-1 text-sm text-white">
				<div class="h-2 w-2 rounded-full {isOnline ? 'bg-green-500' : 'bg-red-500'}"></div>
				<span class="opacity-90">{isOnline ? 'Online' : 'Offline'}</span>
			</div>
			<button class="text-white">
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
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
			</button>
		</div>
	</div>

	<!-- Main Content Area - With padding -->
	<div class="container mx-auto px-4 py-4">
		<!-- Appointments Carousel -->
		<div class="relative">
			{#if appointments.length === 0}
				<div class="text-base-content/70 py-8 text-center">No appointments found.</div>
			{:else}
				<div class="carousel carousel-start rounded-box space-x-4">
					{#each appointments as appointment, index}
						<div class="carousel-item">
							<div
								class="cursor-pointer"
								onclick={() => handleAppointmentClick(appointment)}
								onkeydown={(e) => e.key === 'Enter' && handleAppointmentClick(appointment)}
								role="button"
								tabindex="0"
							>
								<AppointmentCard
									{appointment}
									appointmentIndex={index}
									totalAppointments={appointments.length}
								/>
							</div>
						</div>
					{/each}
				</div>
				<!-- Gradient indicators for more content -->
				<div
					class="from-base-100 pointer-events-none absolute top-0 right-0 h-full w-20 bg-gradient-to-l to-transparent"
				></div>
			{/if}
		</div>

		{#if selectedAppointment}
			<div transition:slide={{ duration: 300 }} class="mt-4">
				<AppointmentDetail
					appointment={selectedAppointment}
					appointmentIndex={appointments.indexOf(selectedAppointment)}
					totalAppointments={appointments.length}
					on:close={() => (selectedAppointment = null)}
				/>
			</div>
		{/if}
	</div>
</div>

<style>
	.carousel {
		@apply max-w-full overflow-x-auto scroll-smooth;
		-ms-overflow-style: none; /* Hide scrollbar IE and Edge */
		scrollbar-width: none; /* Hide scrollbar Firefox */
	}

	/* Hide scrollbar for Chrome, Safari and Opera */
	.carousel::-webkit-scrollbar {
		display: none;
	}
</style>
