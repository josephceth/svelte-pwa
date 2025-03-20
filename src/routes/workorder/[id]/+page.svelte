<script lang="ts">
	import { page } from '$app/stores';

	$: {
		const { id } = $page.params;
		console.log('Current work order ID:', id);
	}
</script>

<div class="container mx-auto p-4">testst</div>
