<script>
	import { analytics } from '$lib/stores';
	import { onMount } from 'svelte';

	let anonymousId;
	onMount(async () => {
		anonymousId = (await analytics.user()).anonymousId();
	});
</script>

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
