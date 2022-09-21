<script>
	import { Theme } from 'carbon-components-svelte';
	import { analytics } from '$lib/stores';
	import { onMount } from 'svelte';
	import Dateline from '../components/Dateline.svelte';

	let anonymousId;
	onMount(async () => {
		anonymousId = (await analytics.user()).anonymousId();
	});
</script>

<Dateline />

<div class="HI">
	<button
		on:click={() => {
			analytics.track('Signed Up', {
				anonymousId,
				plan: 'Hello'
			});
		}}
	/>
</div>
