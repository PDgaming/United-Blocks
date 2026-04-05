import { ConvexHttpClient } from 'convex/browser';
import { api } from './src/convex/_generated/api';
import { GameDig } from 'gamedig';

let CONVEX_URL: string | undefined = undefined;

const args = Bun.argv.slice(2);
if (args[0] == 'dev') {
	console.log('Using dev environment');
	CONVEX_URL = Bun.env.PUBLIC_CONVEX_URL;
} else if (args[0] == 'prod') {
	console.log('Using prod environment');
	CONVEX_URL = Bun.env.PUBLIC_PROD_CONVEX_URL;
} else {
	console.error('Error: Invalid argument. Please use either "dev" or "prod".');
	process.exit(1);
}

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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
