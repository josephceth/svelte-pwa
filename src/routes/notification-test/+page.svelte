<script lang="ts">
	import {
		areNotificationsSupported,
		getNotificationPermission,
		requestNotificationPermission
	} from '$lib/client/utils/notification-permissions';

	let permissionStatus = $state(getNotificationPermission());
	let isSupported = $state(areNotificationsSupported());
	let message = $state('');

	async function requestPermission() {
		message = 'Requesting permission...';
		permissionStatus = await requestNotificationPermission();
		message = `Permission status: ${permissionStatus}`;
	}

	async function testSimpleNotification() {
		if (permissionStatus !== 'granted') {
			message = 'Notification permission not granted';
			return;
		}

		// This tests the browser's notification API directly (not push)
		const notification = new Notification('Test Notification', {
			body: 'This is a local test notification (not a push notification)',
			icon: 'pwa-64x64.png'
		});

		message = 'Local notification sent';
	}

	async function testEndpoint() {
		try {
			const res = await fetch('/api/notifications/test', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ test: true })
			});

			const data = await res.json();
			message = data.message;
		} catch (e) {
			message = 'Error testing endpoint';
			console.error(e);
		}
	}
</script>

<div class="mx-auto my-8 max-w-2xl rounded-xl border border-gray-300 bg-white p-8 shadow-lg">
	<h1 class="mb-6 border-b pb-4 text-3xl font-bold text-gray-900">Push Notification Test</h1>

	<div class="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5">
		<p class="mb-3 text-lg">
			<strong class="text-gray-800">Notifications supported:</strong>
			<span class="font-medium text-blue-800">{isSupported ? 'Yes' : 'No'}</span>
		</p>
		<p class="text-lg">
			<strong class="text-gray-800">Current permission:</strong>
			<span
				class="font-medium"
				class:text-green-700={permissionStatus === 'granted'}
				class:text-red-700={permissionStatus === 'denied'}
				class:text-yellow-700={permissionStatus === 'default'}>{permissionStatus}</span
			>
		</p>
	</div>

	<div class="space-y-5">
		<button
			onclick={requestPermission}
			class="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
			disabled={!isSupported}
		>
			Request Notification Permission
		</button>

		<button
			onclick={testSimpleNotification}
			class="w-full rounded-lg bg-green-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
			disabled={permissionStatus !== 'granted'}
		>
			Test Local Notification
		</button>

		<button
			onclick={testEndpoint}
			class="w-full rounded-lg bg-purple-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 focus:outline-none"
		>
			Test Server Endpoint
		</button>
	</div>

	{#if message}
		<div class="mt-6 rounded-lg border border-gray-300 bg-gray-100 p-5">
			<p class="text-lg text-gray-800">{message}</p>
		</div>
	{/if}
</div>
