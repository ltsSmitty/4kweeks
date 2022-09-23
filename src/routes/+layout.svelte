<script>
	import Analytics from '$lib/analytics.svelte';
	import 'carbon-components-svelte/css/all.css';
	import { Theme } from 'carbon-components-svelte';
</script>

<Theme
	theme="g10"
	tokens={{
		'interactive-01': '#a6cfd5',
		// 'hover-primary': '#ee5396',
		'active-primary': '#9f1853',
		// 'text-secondary': '#5865F2',
		'text-primary': '#5865F2',
		'ui-background': '#c2e7d9' //Xiketic
	}}
/>
<Analytics />
<slot />

<style>
	:root {
		--blackish: #0d0221; /*Xiketic*/
		--dark: #0f084b; /*Midnight Blue*/
		--med: #26408b; /*dark cornflower*/
		--light: #a6cfd5; /*light blue*/
		--whitish: #c2e7d9; /*aero blue*/
	}
</style>
