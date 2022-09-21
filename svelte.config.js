import adapter from '@sveltejs/adapter-auto';
import { optimizeImports } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: [optimizeImports()]
};

export default config;
