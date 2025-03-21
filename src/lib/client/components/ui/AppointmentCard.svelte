<script lang="ts">
	export let appointment: {
		clientName: string;
		locationName: string;
		workOrderId: string;
		startDateTime: Date;
		endDateTime: Date;
		address?: {
			street: string;
			city: string;
			state: string;
			zipCode: string;
		};
	};

	// Add appointment counter props
	export let appointmentIndex: number | undefined = undefined;
	export let totalAppointments: number | undefined = undefined;

	// Derive appointment count display text
	$: appointmentCountText =
		appointmentIndex !== undefined && totalAppointments !== undefined
			? `${appointmentIndex + 1}/${totalAppointments}`
			: '';

	// Helper function to format dates
	const formatTime = (date: Date) => {
		return date.toLocaleString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	};

	// Format date to show only month and day
	const formatDate = (date: Date) => {
		return date.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric'
		});
	};
</script>

<div
	class="card min-w-80 cursor-pointer overflow-hidden rounded-lg border-l-4 border-[#95c11f] bg-white shadow-md transition-all hover:shadow-lg"
>
	<!-- Colored top accent -->
	<div class="h-2 bg-gradient-to-r from-[#00293d] to-[#004866]"></div>

	<div class="w-full p-4">
		<!-- Visit info with counter badge -->
		<div class="mb-2 flex items-start justify-between">
			<div>
				<h2 class="text-xl font-semibold text-gray-800">
					Visit for {appointment.clientName}
				</h2>
				<p class="text-sm text-gray-700">{appointment.locationName}</p>
			</div>
			{#if appointmentCountText}
				<div class="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs text-gray-500">
					{appointmentCountText}
				</div>
			{/if}
		</div>

		<!-- Address (if available) -->
		{#if appointment.address}
			<div class="mb-3 flex items-start text-sm text-gray-600">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mt-0.5 mr-1 h-4 w-4 text-[#95c11f]"
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
				<span>{appointment.address.street}, {appointment.address.city}</span>
			</div>
		{/if}

		<!-- Schedule -->
		<div class="border-t border-gray-100 pt-2">
			<div class="text-sm text-gray-600">
				<div class="flex items-center font-medium">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-1 h-4 w-4 text-[#95c11f]"
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
					Schedule
				</div>
				<div class="pl-5">
					{formatDate(appointment.startDateTime)}
					{formatTime(appointment.startDateTime)} - {formatTime(appointment.endDateTime)}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.card {
		backface-visibility: hidden;
		transform: translateZ(0);
		transition:
			transform 0.25s ease-out,
			box-shadow 0.25s ease-out;
	}

	.card:hover {
		transform: translateY(-2px);
	}
</style>
