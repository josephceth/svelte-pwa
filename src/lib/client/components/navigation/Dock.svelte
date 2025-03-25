<script lang="ts">
	import { mdiHome, mdiBell, mdiCog } from '@mdi/js';

	const dockItems = [
		{
			href: '/',
			icon: mdiHome,
			label: 'Home'
		},
		{
			href: '/notification-test',
			icon: mdiBell,
			label: 'Notifications'
		},
		{
			href: '/settings',
			icon: mdiCog,
			label: 'Settings'
		}
	];
</script>

<nav class="fixed bottom-0 w-full border-t border-gray-800 bg-gray-900 px-4 pt-2 pb-6">
	<div class="mx-auto flex max-w-screen-xl items-center justify-around">
		{#each dockItems as item}
			<a
				href={item.href}
				class="flex flex-col items-center p-2 text-gray-400 transition-colors hover:text-white active:text-blue-400"
			>
				<svg viewBox="0 0 24 24" width="24" height="24" class="mb-1">
					<path fill="currentColor" d={item.icon} />
				</svg>
				<span class="text-xs font-medium">{item.label}</span>
			</a>
		{/each}
	</div>
</nav>
