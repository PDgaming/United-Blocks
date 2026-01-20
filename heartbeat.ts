import { ConvexHttpClient } from 'convex/browser';
import { api } from './src/convex/_generated/api';
import { GameDig } from 'gamedig';

const client = new ConvexHttpClient('https://ceaseless-bandicoot-586.convex.cloud');

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

setInterval(checkAndReport, 3000);
checkAndReport();
