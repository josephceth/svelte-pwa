<script lang="ts">
	import Icon from '../ui/Icon.svelte';
	import { mdiClose, mdiImage, mdiLock, mdiLockOpen, mdiSend } from '@mdi/js';
	import { createEventDispatcher } from 'svelte';

	const { workOrderId } = $props();
	const dispatch = createEventDispatcher();

	// Local state
	let note = $state('');
	let isPrivate = $state(true);
	let imageFile = $state<File | null>(null);
	let imagePreview = $state<string | null>(null);

	function handleClose() {
		dispatch('close');
	}

	function handleImageSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file) {
			imageFile = file;
			imagePreview = URL.createObjectURL(file);
		}
	}

	function handleSubmit() {
		// Mock submission
		console.log('Submitting note:', {
			workOrderId,
			note,
			isPrivate,
			imageFile
		});
		// Close form after submission
		dispatch('close');
	}
</script>

<div class="w-full md:mx-auto md:max-w-lg">
	<div class="card overflow-hidden rounded-lg bg-white shadow-lg">
		<!-- Header -->
		<div class="bg-[#00293d] p-4 text-white">
			<div class="flex items-start justify-between">
				<div class="space-y-0.5">
					<h2 class="text-lg font-medium">Add Note</h2>
					<p class="text-sm opacity-80">Work Order: {workOrderId}</p>
				</div>
				<button class="text-white" on:click={handleClose} aria-label="Close note form">
					<Icon path={mdiClose} class_name="h-6 w-6" />
				</button>
			</div>
		</div>

		<!-- Form Body -->
		<div class="p-4">
			<form on:submit|preventDefault={handleSubmit} class="space-y-4">
				<!-- Note Input -->
				<div class="space-y-2">
					<label for="note" class="block text-sm font-medium text-gray-700"> Note </label>
					<textarea
						id="note"
						bind:value={note}
						rows="4"
						class="w-full rounded-lg border border-gray-300 p-2 text-gray-700 focus:border-[#95c11f] focus:ring-1 focus:ring-[#95c11f] focus:outline-none"
						placeholder="Enter your note here..."
					></textarea>
				</div>

				<!-- Image Upload -->
				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700"> Image </label>
					<div class="flex flex-col gap-2">
						<label
							class="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-[#95c11f]"
						>
							<Icon path={mdiImage} class_name="h-6 w-6 text-gray-400" />
							<span class="text-sm text-gray-600">Click to upload image</span>
							<input type="file" accept="image/*" class="hidden" on:change={handleImageSelect} />
						</label>

						{#if imagePreview}
							<div class="relative">
								<img src={imagePreview} alt="Preview" class="h-40 w-full rounded-lg object-cover" />
								<button
									type="button"
									class="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
									on:click={() => {
										imageFile = null;
										imagePreview = null;
									}}
									aria-label="Remove image"
								>
									<Icon path={mdiClose} class_name="h-4 w-4" />
								</button>
							</div>
						{/if}
					</div>
				</div>

				<!-- Privacy Toggle -->
				<div class="flex items-center gap-2">
					<button
						type="button"
						class="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:border-[#95c11f]"
						on:click={() => (isPrivate = !isPrivate)}
					>
						<Icon
							path={isPrivate ? mdiLock : mdiLockOpen}
							class_name="h-5 w-5 {isPrivate ? 'text-[#95c11f]' : 'text-gray-500'}"
						/>
						<span class={isPrivate ? 'text-[#95c11f]' : 'text-gray-700'}>
							{isPrivate ? 'Private Note' : 'Public Note'}
						</span>
					</button>
				</div>

				<!-- Submit Button -->
				<div class="pt-4">
					<button
						type="submit"
						class="btn h-12 w-full border-none bg-[#95c11f] text-white hover:bg-[#7da219] disabled:bg-gray-300"
						disabled={!note.trim()}
					>
						<Icon path={mdiSend} class_name="h-5 w-5 mr-2" />
						Add Note
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	/* Optional: Add smooth transitions */
	.card {
		transition: transform 0.2s ease-in-out;
	}

	button {
		transition: all 0.2s ease-in-out;
	}
</style>
