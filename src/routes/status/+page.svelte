<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';
	import Icon from '@iconify/svelte';
	import Footer from '../components/footer.svelte';

	const statuss = useQuery(api.status.getStatus, {});
	console.log(statuss.data);
	const status = {
		pcOnline: true,
		mcOnline: true,
		lastUpdated: new Date().toLocaleDateString()
	};
</script>

<!--
{#if status.isLoading}
	<p>Loading status...</p>
{:else}
	<span class={status.data.pcOnline ? 'online' : 'offline'}>
		{status.data.pcOnline ? '🟢 Online' : '🔴 Offline (Power Cut?)'}
	</span>
	<span class={status.data.mcOnline ? 'online' : 'offline'}>
		{status.data.mcOnline ? '⚔️ Running' : '💤 Stopped'}
	</span>
{/if}
-->

<div class="min-h-screen bg-background text-foreground">
	<!-- Header -->
	<header
		class="border-b border-border bg-card/50 backdrop-blur supports-backdrop-filter:bg-card/50"
	>
		<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
			<div class="flex items-center gap-4">
				<button
					onclick={() => window.history.back()}
					class="inline-flex size-9 h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-md border bg-background text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:border-input dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
				>
					<Icon icon="lucide:arrow-left" width="24" height="24" />
				</button>
				<div class="flex items-center gap-3">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground"
					>
						📊
					</div>
					<h1 class="text-3xl font-bold">Server Status</h1>
				</div>
			</div>
		</div>
	</header>

	<!-- Status Content -->
	<section class="px-4 py-16 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl">
			<div class="grid gap-6">
				<!-- Server Status Card -->
				<div class="rounded-lg border border-border bg-card p-8">
					<div class="mb-6 flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary"
							>
								🖥️
							</div>
							<h2 class="text-2xl font-bold">Server</h2>
						</div>
						<div class="flex items-center gap-2">
							<div
								class={`h-3 w-3 rounded-full ${status.pcOnline ? 'bg-green-500' : 'bg-red-500'}`}
							></div>
							<span
								class={`text-lg font-semibold ${
									status.pcOnline ? 'text-green-500' : 'text-red-500'
								}`}
							>
								{status.pcOnline ? '🟢 Online' : '🔴 Offline (Power Cut?)'}
							</span>
						</div>
					</div>

					<div class="rounded-lg border border-border bg-background/50 p-4">
						<p class="mb-2 text-sm text-muted-foreground">Status Description</p>
						<p class="text-foreground">
							{status.pcOnline
								? 'The hosting server is currently online and responsive.'
								: 'The hosting server is currently offline. This may be due to a power outage or maintenance.'}
						</p>
					</div>
				</div>

				<!-- Minecraft Server Status Card -->
				<div class="rounded-lg border border-border bg-card p-8">
					<div class="mb-6 flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20 text-secondary"
							>
								⛏️
							</div>
							<h2 class="text-2xl font-bold">Minecraft Server</h2>
						</div>
						<div class="flex items-center gap-2">
							<div
								class={`h-3 w-3 rounded-full ${status.mcOnline ? 'bg-green-500' : 'bg-red-500'}`}
							></div>
							<span
								class={`text-lg font-semibold ${
									status.mcOnline ? 'text-green-500' : 'text-red-500'
								}`}
							>
								{status.mcOnline ? '⚔️ Running' : '💤 Stopped'}
							</span>
						</div>
					</div>

					<div class="rounded-lg border border-border bg-background/50 p-4">
						<p class="mb-2 text-sm text-muted-foreground">Status Description</p>
						<p class="text-foreground">
							{status.mcOnline
								? 'The Minecraft server is running and accepting connections on both Java and Bedrock editions.'
								: 'The Minecraft server is not currently running. Use the /start command in Discord to start it.'}
						</p>
					</div>
				</div>

				<!-- Last Updated -->
				<div class="flex items-center gap-2 rounded-lg border border-border bg-background/50 p-4">
					<Icon icon="lucide:activity" width="24" height="24" />
					<!-- <Activity className="h-4 w-4 text-muted-foreground" /> -->
					<p class="text-sm text-muted-foreground">
						Last updated: <span class="font-semibold text-foreground">{status.lastUpdated}</span>
					</p>
				</div>

				<!-- Navigation -->
				<button
					onclick={() => window.history.back()}
					class="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
				>
					<Icon icon="lucide:arrow-left" width="24" height="24" />
					Back to Home
				</button>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<Footer />
</div>
