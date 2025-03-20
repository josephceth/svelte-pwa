<script lang="ts">
	import AppointmentCard from '$lib/client/components/ui/AppointmentCard.svelte';
	import AppointmentDetail from '$lib/client/components/ui/AppointmentDetail.svelte';
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';

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
	export let data;
	$: appointments = data.appointments.map((apt: Partial<Appointment>) => ({
		...apt,
		startDateTime: new Date(apt.startDateTime!),
		endDateTime: new Date(apt.endDateTime!)
	}));

	// Format today's date
	const today = new Date();
	const formattedDate = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	}).format(today);

	// Get today's appointments count
	$: todaysAppointments = appointments.filter(
		(apt: Appointment) => apt.startDateTime.toDateString() === today.toDateString()
	);

	let selectedAppointment: (typeof appointments)[0] | null = null;

	function handleAppointmentClick(appointment: (typeof appointments)[0]) {
		selectedAppointment = selectedAppointment === appointment ? null : appointment;
	}
</script>

<div class="container mx-auto flex flex-col gap-4 p-4">
	<!-- Header Section -->
	<div class="bg-base-200 -mx-4 -mt-4 flex flex-col gap-0.5 px-4 py-3">
		<h1 class="text-base-content text-lg font-medium">{formattedDate}</h1>
		<p class="text-base">{appointments.length} visits today</p>
	</div>

	<!-- Appointments Carousel -->
	<div class="relative">
		{#if appointments.length === 0}
			<div class="text-base-content/70 py-8 text-center">No appointments found.</div>
		{:else}
			<div class="carousel carousel-start rounded-box space-x-4">
				{#each appointments as appointment}
					<div class="carousel-item">
						<div
							class="cursor-pointer"
							on:click={() => handleAppointmentClick(appointment)}
							on:keydown={(e) => e.key === 'Enter' && handleAppointmentClick(appointment)}
							role="button"
							tabindex="0"
						>
							<AppointmentCard {appointment} />
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
		<div transition:slide={{ duration: 300 }}>
			<AppointmentDetail
				appointment={selectedAppointment}
				on:close={() => (selectedAppointment = null)}
			/>
		</div>
	{/if}
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
