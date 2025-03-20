<script lang="ts">
	export let appointment: {
		clientName: string;
		locationName: string;
		workOrderId: string;
		startDateTime: Date;
		endDateTime: Date;
	};

	// Helper function to format dates
	const formatDateTime = (date: Date) => {
		return date.toLocaleString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	};
</script>

<button
	class="card bg-base-100 hover:bg-base-200 min-w-80 cursor-pointer shadow-xl transition-colors"
>
	<div class="w-full py-6 pl-4">
		<div class="flex items-start justify-between">
			<h2 class="card-title text-primary text-lg font-bold">
				{appointment.clientName}
			</h2>
		</div>

		<div class="mt-2">
			<div class="flex items-center gap-2">
				<i class="mdi mdi-map-marker h-4 w-4"></i>
				<span class="text-sm">{appointment.locationName}</span>
			</div>

			<div class="mt-2 flex items-center gap-2">
				<i class="mdi mdi-calendar h-4 w-4"></i>
				<div class="text-sm">
					<div>Start: {formatDateTime(appointment.startDateTime)}</div>
					<div>End: {formatDateTime(appointment.endDateTime)}</div>
				</div>
			</div>
		</div>
	</div>
</button>
