<script lang="ts">
	import Icon from '@iconify/svelte';
	import { resolve } from '$app/paths';
	import Footer from './components/footer.svelte';

	let copiedJava = $state(false);
	let copiedBedrock = $state(false);

	function copyToClipboard(text: string, isBedrock: boolean) {
		navigator.clipboard.writeText(text);
		if (isBedrock) {
			copiedBedrock = true;
			setTimeout(() => {
				copiedBedrock = false;
			}, 500);
		} else {
			copiedJava = true;
			setTimeout(() => {
				copiedJava = false;
			}, 500);
		}
	}

	const javaAddress = 'availability-implement.gl.joinmc.link';
	const javaVersion = '1.21.11';
	const bedrockAddress = 'catalog-walls.gl.at.ply.gg';
	const bedrockPort = '9976';
	const discordLink = 'YOUR_DISCORD_INVITE_LINK_HERE';
</script>

<div class="min-h-screen bg-background text-foreground">
	<!-- Header -->
	<header
		class="border-b border-border bg-background backdrop-blur supports-backdrop-filter:bg-card"
	>
		<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground"
					>
						⛏️
					</div>
					<h1 class="text-3xl font-bold">United Blocks</h1>
				</div>
				<nav class="hidden gap-6 md:flex">
					<a
						href={`https://discord.gg/${discordLink}`}
						class="text-muted-foreground transition-colors hover:text-foreground">Discord</a
					>
					<a
						href="#server-details"
						class="text-muted-foreground transition-colors hover:text-foreground">Connect</a
					>
				</nav>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section
		class="relative overflow-hidden border-b border-border bg-gradient-to-b from-card to-background px-4 py-20 sm:px-6 lg:px-8"
	>
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">Ready to Play?</h2>
			<p class="mb-8 text-lg text-muted-foreground sm:text-xl">
				Join our thriving Minecraft community. Play on Java or Bedrock edition.
			</p>
			<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
				<button
					onclick={() => copyToClipboard(javaAddress, false)}
					class="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
				>
					<Icon icon="lucide:copy" class="h-4 w-4" />

					{copiedJava ? 'Copied!' : 'Java Server Address'}
				</button>
				<button
					onclick={() => copyToClipboard(`${bedrockAddress}:${bedrockPort}`, true)}
					class="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none hover:bg-secondary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
				>
					<Icon icon="lucide:copy" class="h-4 w-4" />

					{copiedBedrock ? 'Copied!' : 'Bedrock Server Address'}
				</button>
			</div>
		</div>
	</section>

	<!-- Server Details -->
	<section id="server-details" class="bg-background px-4 py-16 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-12 text-3xl font-bold">Server Details</h2>

			<div class="grid gap-8 md:grid-cols-2">
				<!-- Java Edition Card -->
				<div class="rounded-lg border border-border bg-card p-8">
					<div class="mb-6 flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary"
						>
							🖥️
						</div>
						<h3 class="text-2xl font-bold">Java Edition</h3>
					</div>

					<div class="space-y-4">
						<div>
							<p class="mb-1 text-sm text-muted-foreground">Server Address</p>
							<div class="flex items-center gap-2">
								<code class="flex-1 rounded bg-background px-3 py-2 font-mono text-sm">
									{javaAddress}
								</code>
								<button
									onclick={() => copyToClipboard(javaAddress, false)}
									class="h-8 gap-1.5 rounded-md border bg-background px-3 shadow-xs hover:bg-accent hover:text-accent-foreground has-[>svg]:px-2.5 dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
								>
									<Icon icon="lucide:copy" class="h-4 w-4" />
								</button>
							</div>
						</div>

						<div>
							<p class="mb-1 text-sm text-muted-foreground">Version</p>
							<div class="rounded bg-background px-3 py-2">
								<span class="font-mono">{javaVersion}</span>
							</div>
						</div>

						<div class="rounded-lg border border-border bg-background/50 p-4">
							<p class="text-sm text-muted-foreground">Compatible with:</p>
							<p class="mt-1 text-sm">Version {javaVersion} and matching snapshots</p>
						</div>
					</div>
				</div>

				<!-- Bedrock Edition Card -->
				<div class="rounded-lg border border-border bg-card p-8">
					<div class="mb-6 flex items-center gap-3">
						<div
							class="flex h-8 w-10 items-center justify-center gap-1.5 rounded-md bg-secondary/20 px-3 text-secondary has-[>svg]:px-2.5"
						>
							📱
						</div>
						<h3 class="text-2xl font-bold">Bedrock Edition</h3>
					</div>

					<div class="space-y-4">
						<div>
							<p class="mb-1 text-sm text-muted-foreground">Server Address</p>
							<div class="flex items-center gap-2">
								<code class="flex-1 rounded bg-background px-3 py-2 font-mono text-sm">
									{bedrockAddress}
								</code>
								<button
									onclick={() => copyToClipboard(bedrockAddress, true)}
									class="h-8 gap-1.5 rounded-md border bg-background px-3 shadow-xs hover:bg-accent hover:text-accent-foreground has-[>svg]:px-2.5 dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
								>
									<Icon icon="lucide:copy" class="h-4 w-4" />
								</button>
							</div>
						</div>

						<div>
							<p class="mb-1 text-sm text-muted-foreground">Port</p>
							<div class="rounded bg-background px-3 py-2">
								<span class="font-mono">{bedrockPort}</span>
							</div>
						</div>

						<div class="rounded-lg border border-border bg-background/50 p-4">
							<p class="text-sm text-muted-foreground">Compatible with:</p>
							<p class="mt-1 text-sm">All Bedrock platforms (Mobile, Console, Windows 10/11)</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Server Status and Info -->
	<section class="border-t border-border bg-card px-4 py-16 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-6xl">
			<div class="grid gap-8 md:grid-cols-2">
				<!-- Server Status  -->
				<div class="rounded-lg border border-border bg-background p-8">
					<div class="mb-4 flex items-center gap-3">
						<Icon icon="lucide:zap" class="h-6 w-6 text-primary" />
						<h3 class="text-xl font-bold">Server Status</h3>
					</div>
					<p class="mb-4 text-muted-foreground">
						Note: The server may be inactive at times due to electricity outages in the area the
						server is hosted in.
					</p>
					<div class="rounded-lg border border-border bg-background p-4">
						<p class="font-mono text-sm">For real-time server status and updates:</p>
						<a href={resolve('/status')} class="mt-2 text-sm text-muted-foreground underline"
							>Check the Status Page</a
						>
					</div>
				</div>

				<!-- Server Management -->
				<div class="rounded-lg border border-border bg-background p-8">
					<div class="mb-4 flex items-center gap-3">
						<Icon icon="lucide:message-square" class="h-6 w-6 text-secondary" />
						<h3 class="text-xl font-bold">Server Management</h3>
					</div>
					<p class="mb-4 text-muted-foreground">
						Use the @PervertedOldMan bot in the Discord <code
							class="rounded bg-card px-2 py-1 text-sm">game-chat</code
						> channel to manage the server.
					</p>
					<div class="rounded-lg border border-border bg-background p-4">
						<p class="font-mono text-sm">/start</p>
						<p class="mt-2 text-sm text-muted-foreground">Use this command to start the server</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Discord CTA -->
	<section class="border-t border-border bg-background px-4 py-16 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-6 text-3xl font-bold">Join Our Community</h2>
			<p class="mb-8 text-lg text-muted-foreground">
				Connect with other players, get server updates, and participate in events on Discord.
			</p>
			<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
				<a
					href={`https://discord.gg/${discordLink}`}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
				>
					<svg viewBox="0 0 256 199" preserveAspectRatio="xMidYMid" class="h-4 w-4"
						><path
							d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z"
							fill="#5865F2"
						/></svg
					>

					Join Discord Server
				</a>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<Footer />
</div>
