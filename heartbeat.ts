import { ConvexHttpClient } from 'convex/browser';
import { api } from './src/convex/_generated/api';
import { GameDig } from 'gamedig';

const CONVEX_URL = Bun.env.PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
	console.error('Error: PUBLIC_CONVEX_URL not found in environment.');
	process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

async function checkAndReport() {
	let mcRunning = false;

	try {
		const state = await GameDig.query({
			type: 'minecraft',
			host: '127.0.0.1',
			port: 25565,
			socketTimeout: 3000
		});
		console.log(
			`[${new Date().toLocaleTimeString()}] MC Server: ${state.name} (${state.players.length} players online)`
		);

		mcRunning = !!state;
	} catch (e) {
		mcRunning = false;
		console.log(`[${new Date().toLocaleTimeString()}] MC Server: Offline`);
	}

	await client.mutation(api.status.reportStatus, {
		name: 'Home-PC',
		mcStatus: mcRunning
	});
	console.log(`[${new Date().toLocaleTimeString()}] PC: Online | MC: ${mcRunning}`);
}

setInterval(checkAndReport, 10000);
checkAndReport();
