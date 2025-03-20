<script lang="ts">
	import AppointmentCard from '$lib/client/components/ui/AppointmentCard.svelte';

	// Mock appointments data
	const appointments = [
		{
			clientName: 'John Smith',
			locationName: 'Downtown Office Building',
			workOrderId: 'WO-2024-1234',
			startDateTime: new Date('2024-03-20T09:00:00'),
			endDateTime: new Date('2024-03-20T11:00:00')
		},
		{
			clientName: 'Sarah Johnson',
			locationName: 'Westside Mall',
			workOrderId: 'WO-2024-1235',
			startDateTime: new Date('2024-03-20T13:00:00'),
			endDateTime: new Date('2024-03-20T15:00:00')
		},
		{
			clientName: 'Mike Williams',
			locationName: 'North Station Complex',
			workOrderId: 'WO-2024-1236',
			startDateTime: new Date('2024-03-20T16:00:00'),
			endDateTime: new Date('2024-03-20T18:00:00')
		},
		{
			clientName: 'Emily Davis',
			locationName: 'Central Park Hotel',
			workOrderId: 'WO-2024-1237',
			startDateTime: new Date('2024-03-21T09:00:00'),
			endDateTime: new Date('2024-03-21T11:00:00')
		},
		{
			clientName: 'Robert Brown',
			locationName: 'Tech Plaza',
			workOrderId: 'WO-2024-1238',
			startDateTime: new Date('2024-03-21T13:00:00'),
			endDateTime: new Date('2024-03-21T15:00:00')
		}
	];
</script>

<div class="relative">
	<div class="carousel carousel-start rounded-box space-x-2 p-4">
		{#each appointments as appointment}
			<div class="carousel-item">
				<AppointmentCard {appointment} />
			</div>
		{/each}
	</div>
	<!-- Gradient indicators for more content -->
	<div
		class="from-base-100 pointer-events-none absolute top-0 right-0 h-full w-20 bg-gradient-to-l to-transparent"
	></div>
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
