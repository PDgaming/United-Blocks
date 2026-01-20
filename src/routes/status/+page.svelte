<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';

	const status = useQuery(api.status.getStatus, {});
</script>

<div class="status-card">
	{#if status.isLoading}
		<p>Loading status...</p>
	{:else}
		<div class="indicator">
			<span>Computer:</span>
			<span class={status.data.pcOnline ? 'online' : 'offline'}>
				{status.data.pcOnline ? '🟢 Online' : '🔴 Offline (Power Cut?)'}
			</span>
		</div>
		<div class="indicator">
			<span>Minecraft Server:</span>
			<span class={status.data.mcOnline ? 'online' : 'offline'}>
				{status.data.mcOnline ? '⚔️ Running' : '💤 Stopped'}
			</span>
		</div>
	{/if}
</div>

<style>
	.online {
		color: green;
		font-weight: bold;
	}
	.offline {
		color: red;
		font-weight: bold;
	}
</style>
