<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="bg-gray-800 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<span class="text-xl font-bold">PWA Demo</span>
				</div>
				<div class="ml-10 flex items-baseline space-x-4">
					<a
						href="/"
						class="rounded-md px-3 py-2 text-sm font-medium {$page.url.pathname === '/'
							? 'bg-gray-900 text-white'
							: 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
					>
						Home
					</a>
					<a
						href="/stuff"
						class="rounded-md px-3 py-2 text-sm font-medium {$page.url.pathname === '/stuff'
							? 'bg-gray-900 text-white'
							: 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
					>
						Stuff
					</a>
				</div>
			</div>
		</div>
	</div>
</nav>
