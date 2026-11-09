import { ConvexHttpClient } from 'convex/browser';
import { api } from './src/convex/_generated/api';
import { GameDig } from 'gamedig';

// constants
const INTERVAL = 10_000;
let convexClient: ConvexHttpClient;
const DEV_URL = Bun.env.PUBLIC_CONVEX_URL;
const PROD_URL = Bun.env.PUBLIC_PROD_CONVEX_URL;

if (!DEV_URL || !PROD_URL) {
	console.error(`Error: ${!DEV_URL ? 'DEV' : 'Prod'} Key missing.`);
	process.exit(1);
}

const args = Bun.argv.slice(2);
switch (args[0]) {
	case '--dev':
		convexClient = new ConvexHttpClient(DEV_URL);
		checkAndReport();
		break;
	case '--prod':
		convexClient = new ConvexHttpClient(PROD_URL);
		checkAndReport();
		break;
	default:
		console.error('Invalid argument: Please use either "--dev" or "--prod".');
		process.exit(1);
}

async function checkAndReport() {
	const start = Date.now();

	let mcRunning = false;

	try {
		const state = await GameDig.query({
			type: 'minecraft',
			host: '127.0.0.1',
			port: 25565,
			socketTimeout: 1000
		});
		console.log(`MC Server: ${state.name} (${state.players.length} players online)`);

		mcRunning = !!state;
	} catch (e) {
		mcRunning = false;
		console.log(`MC Server: Offline`);
	}

	await convexClient.mutation(api.status.reportStatus, {
		name: 'Home-PC',
		mcStatus: mcRunning
	});
	console.log(`PC: Online | MC: ${mcRunning}`);

	const elapsed = Date.now() - start;
	setTimeout(checkAndReport, Math.max(0, INTERVAL - elapsed));
}
