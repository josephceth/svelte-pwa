<script>
	import { $state, $effect } from 'svelte';

	let cacheInfo = $state({
		caches: [],
		keys: []
	});

	// Function to get all cache contents
	async function inspectCache() {
		try {
			// Get list of all caches
			const cacheNames = await caches.keys();
			cacheInfo.caches = cacheNames;

			// For each cache, get all keys
			const allCacheData = await Promise.all(
				cacheNames.map(async (cacheName) => {
					const cache = await caches.open(cacheName);
					const keys = await cache.keys();
					return {
						name: cacheName,
						urls: keys.map((request) => request.url)
					};
				})
			);

			cacheInfo.keys = allCacheData;
		} catch (error) {
			console.error('Cache inspection error:', error);
		}
	}

	// Check cache contents when component mounts and periodically
	$effect(() => {
		if (typeof window !== 'undefined' && 'caches' in window) {
			inspectCache();
			// Update cache info every 30 seconds
			const interval = setInterval(inspectCache, 30000);
			return () => clearInterval(interval);
		}
	});
</script>

<!-- Add this somewhere in your layout where it won't interfere with the main UI -->
<div
	class="cache-debug"
	style="position: fixed; bottom: 0; left: 0; background: rgba(0,0,0,0.8); color: white; padding: 10px; max-height: 200px; overflow-y: auto; font-size: 12px; z-index: 9999; max-width: 100%;"
>
	<h4>Cache Information:</h4>
	{#if cacheInfo.caches.length > 0}
		<div>
			<strong>Cache Stores ({cacheInfo.caches.length}):</strong>
			<ul>
				{#each cacheInfo.keys as cache}
					<li>
						{cache.name}:
						<ul>
							{#each cache.urls as url}
								<li>{new URL(url).pathname}</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<p>No caches found</p>
	{/if}
</div>
