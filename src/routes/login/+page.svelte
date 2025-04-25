<script lang="ts">
	import { goto } from '$app/navigation';
	import { sessionData } from '$lib/stores/auth.svelte';

	let email = $state();
	let password = $state();
	async function login() {
		const res = await fetch('https://techtrackdocker.azurewebsites.net/api/mobile/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		});
		if (res.ok) {
			const data = await res.json();
			sessionData.sessionId = data.sessionId;
			sessionData.user = data.user;
			window.alert('Login successful!');
			goto('/');
		} else {
			window.alert('Login failed. Please check your credentials.');
		}
	}
</script>

<input class="input" type="email" placeholder="Email" bind:value={email} />
<input class="input" type="password" placeholder="Password" bind:value={password} />
<button class="btn" onclick={login}>Login</button>
