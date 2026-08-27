import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const target = process.env.BUILD_TARGET ?? 'cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter:
			target === 'static'
				? adapterStatic({
						// Serve the whole app as a SPA from a single fallback page.
						// Deep links like /united-blocks/status are routed on the client.
						fallback: 'index.html'
					})
				: adapterCloudflare(),

		paths: target === 'static' ? { base: '/united-blocks' } : undefined,

		prerender: target === 'static' ? { entries: ['/'] } : undefined
	}
};

export default config;
