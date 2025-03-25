<script lang="ts">
	export let path: string;
	export let size: string = '24';
	export let color: string = 'currentColor';
	export let class_name: string = '';
</script>

<svg viewBox="0 0 24 24" width={size} height={size} class={class_name}>
	<path fill={color} d={path} />
</svg>
