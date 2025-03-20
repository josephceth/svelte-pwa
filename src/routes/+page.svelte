<script lang="ts">
	import AppointmentCard from '$lib/client/components/ui/AppointmentCard.svelte';
	import AppointmentDetail from '$lib/client/components/ui/AppointmentDetail.svelte';
	import { slide } from 'svelte/transition';

	// Mock appointments data
	const appointments = [
		{
			clientName: 'John Smith',
			locationName: 'Downtown Office Building',
			workOrderId: 'WO-2024-1234',
			startDateTime: new Date('2024-03-20T09:00:00'),
			endDateTime: new Date('2024-03-20T11:00:00'),
			address: {
				street: '123 Business Ave',
				city: 'Downtown',
				state: 'NY',
				zipCode: '10001'
			}
		},
		{
			clientName: 'Sarah Johnson',
			locationName: 'Westside Mall',
			workOrderId: 'WO-2024-1235',
			startDateTime: new Date('2024-03-20T13:00:00'),
			endDateTime: new Date('2024-03-20T15:00:00'),
			address: {
				street: '789 Mall Boulevard',
				city: 'Westside',
				state: 'NY',
				zipCode: '10002'
			}
		},
		{
			clientName: 'Mike Williams',
			locationName: 'North Station Complex',
			workOrderId: 'WO-2024-1236',
			startDateTime: new Date('2024-03-20T16:00:00'),
			endDateTime: new Date('2024-03-20T18:00:00'),
			address: {
				street: '456 Station Road',
				city: 'North City',
				state: 'NY',
				zipCode: '10003'
			}
		},
		{
			clientName: 'Emily Davis',
			locationName: 'Central Park Hotel',
			workOrderId: 'WO-2024-1237',
			startDateTime: new Date('2024-03-21T09:00:00'),
			endDateTime: new Date('2024-03-21T11:00:00'),
			address: {
				street: '321 Park Avenue',
				city: 'Central City',
				state: 'NY',
				zipCode: '10004'
			}
		},
		{
			clientName: 'Robert Brown',
			locationName: 'Tech Plaza',
			workOrderId: 'WO-2024-1238',
			startDateTime: new Date('2024-03-21T13:00:00'),
			endDateTime: new Date('2024-03-21T15:00:00'),
			address: {
				street: '555 Tech Drive',
				city: 'Innovation',
				state: 'NY',
				zipCode: '10005'
			}
		}
	];

	let selectedAppointment: (typeof appointments)[0] | null = null;

	function handleAppointmentClick(appointment: (typeof appointments)[0]) {
		selectedAppointment = selectedAppointment === appointment ? null : appointment;
	}
</script>

<div class="container mx-auto flex flex-col gap-4 p-4">
	<div class="relative">
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
