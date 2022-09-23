<script>
	import { onMount } from 'svelte';
	let weekCounter = 4000;
	onMount(() => {
		setInterval(
			() => {
				if (weekCounter <= 0) return;
				weekCounter -= 1;
			},
			1000 //count down one every two seconds
		);
	});
</script>

<div class="container">
	<h1 class="top">{weekCounter} Weeks</h1>
</div>

<style>
	:root {
		--h: 100px;
		/* --w: 90%; */
	}
	.container {
		/* border: solid;
		border-color: var(--med);
		border-width: 4px 0px; */
	}

	.top {
		height: var(--h);
		width: var(--w);
		background-color: var(--whitish);
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bottom {
	}
</style>
