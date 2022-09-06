// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { esbuildCommonjs, viteCommonjs } from '@originjs/vite-plugin-commonjs';

const config = {
	plugins: [sveltekit(), viteCommonjs()],
	optimizeDeps: {
		esbuildOptions: {
			plugins: [esbuildCommonjs(['analytics-node'])] // the problematic cjs module
		},
		include: ['analytics-node']
	}
};

export default config;
