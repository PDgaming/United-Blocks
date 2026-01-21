<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { setupConvex } from 'convex-svelte';
	import { CONVEX_URL } from '$env/static/public';

	let { children } = $props();
	setupConvex(CONVEX_URL);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{@render children()}
