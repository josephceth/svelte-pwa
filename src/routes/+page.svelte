<script lang="ts">
	import AssignmentCard from '$lib/client/components/ui/AssignmentCard.svelte';
	import AssignmentDetailCard from '$lib/client/components/ui/AssignmentDetailCard.svelte';
	import { slide, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import {
		mdiCog, // For settings gear
		mdiBell // For notification bell
	} from '@mdi/js';
	import NoteForm from '$lib/client/components/notes/NoteForm.svelte';

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
	let showCache = $state(false);

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

	let cacheData = $state<any>(null);
	let error = $state<string | null>(null);

	// Add state for note form visibility
	let showNoteForm = $state(false);
	let activeWorkOrderId = $state<string | null>(null);

	async function getCacheData() {
		try {
			// Get the cache
			const cache = await caches.open('api-cache-v1');

			// Get all cached requests
			const keys = await cache.keys();
			const responses = await Promise.all(
				keys.map(async (key) => {
					const response = await cache.match(key);
					const data = await response?.json();
					return {
						url: key.url,
						data
					};
				})
			);

			cacheData = responses;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to fetch cache data';
		}
	}

	$effect(() => {
		getCacheData();
	});

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

	// Handler for note form visibility
	function handleShowNoteForm(workOrderId: string) {
		activeWorkOrderId = workOrderId;
		showNoteForm = true;
	}

	function handleCloseNoteForm() {
		showNoteForm = false;
		activeWorkOrderId = null;
	}
</script>

<div class="flex w-full flex-col">
	<!-- Header Section - Full width with dark blue background -->
	<div class="flex w-full items-center justify-between bg-[#00293d] px-4 py-4 text-white">
		<!-- Settings gear on the left -->
		<button class="text-white">
			<svg viewBox="0 0 24 24" class="h-6 w-6">
				<path fill="currentColor" d={mdiCog} />
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
				<svg viewBox="0 0 24 24" class="h-6 w-6">
					<path fill="currentColor" d={mdiBell} />
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
								<AssignmentCard
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
				<AssignmentDetailCard
					appointment={selectedAppointment}
					appointmentIndex={appointments.indexOf(selectedAppointment)}
					totalAppointments={appointments.length}
					on:close={() => (selectedAppointment = null)}
					on:addNote={() => handleShowNoteForm(selectedAppointment.workOrderId)}
				/>
			</div>
		{/if}
	</div>
</div>
<div class="flex justify-center">
	<button class="btn btn-xs btn-primary" onclick={() => (showCache = !showCache)}>Show Cache</button
	>
</div>
{#if error}
	<div class="rounded-lg bg-red-50 p-4 text-red-600">
		Error: {error}
	</div>
{:else if !cacheData}
	<div class="p-4 text-blue-600">Loading cache data...</div>
{:else if showCache}
	<div class="mx-auto max-w-6xl p-6">
		<h1 class="mb-6 text-3xl font-bold text-gray-800">Cached API Data</h1>
		{#each cacheData as item}
			<div class="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
				<h2 class="mb-3 text-lg font-semibold text-blue-700">
					URL: {item.url}
				</h2>
				<pre
					class="mt-2 overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 font-mono text-sm text-gray-700">
					{JSON.stringify(item.data, null, 2)}
				</pre>
			</div>
		{/each}
	</div>
{/if}

<!-- Note Form Layer -->
{#if showNoteForm}
	<div class="fixed inset-0 z-50 bg-white" transition:fly={{ x: '100%', duration: 300 }}>
		<NoteForm workOrderId={activeWorkOrderId} on:close={handleCloseNoteForm} />
	</div>
{/if}

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
