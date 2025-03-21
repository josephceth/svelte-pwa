<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Navigation from '$lib/client/components/navigation/Navigation.svelte';
	import Dock from '$lib/client/components/navigation/Dock.svelte';

	async function detectServiceWorkerUpdate() {
		const registration = await navigator.serviceWorker.ready;
		registration.addEventListener('updatefound', () => {
			const newWorker = registration.installing;
			newWorker?.addEventListener('statechange', () => {
				if (newWorker?.state === 'installed') {
					if (confirm('New version available. Reload to update?')) {
						newWorker.postMessage('skipWaiting');
						window.location.reload();
					}
				}
			});
		});
	}
	let { children } = $props();

	onMount(async () => {
		await detectServiceWorkerUpdate();
	});
</script>

<div class="min-h-screen bg-white">
	{@render children()}
	<Dock />
</div>
