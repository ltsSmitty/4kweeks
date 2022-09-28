<script>
	import { birthday } from '$lib/stores';
	import {
		calculateWeeksFromBirthdayToToday,
		calculateLastWeek,
		getMessageForWeek
	} from '$lib/helpers';

	let quote = '';

	$: year = $birthday.slice(0, 4);
	$: month = $birthday.slice(5, 7);
	$: day = $birthday.slice(8, 10);
	$: currentWeek = calculateWeeksFromBirthdayToToday($birthday) || 2000;
	$: lastDate = calculateLastWeek($birthday);
	$: lastDaymdy = `${lastDate.slice(5, 7)}/${lastDate.slice(8, 10)}/${lastDate.slice(0, 4)}`;
	$: quote = getMessageForWeek(currentWeek)
		.then((response) => response)
		.then((data) => {
			// console.log(data);
			quote = data.message;
		});
	export let isBirthdaySubmitted = true;
</script>

<div class="results-wrapper" style:display={!isBirthdaySubmitted ? 'none' : 'initial'}>
	<h2>
		You're already {currentWeek} weeks old. That means you only have {4000 - currentWeek} weeks left.
	</h2>

	<div class="stats">
		Some stats:
		<ul expressive>
			<li>
				You've lived {((currentWeek * 100) / 4000).toFixed(1)}% of your expected lifespan.
			</li>
			<div class="quote">
				Here's an inspirational quote about your life:
				<h3 class="actual-quote" size="medium" style:margin="8px">
					{quote}
				</h3>
			</div>
		</ul>
	</div>
</div>

<style>
	.results-wrapper {
		background-color: var(--med);
	}
	.stats {
		font-size: large;
		margin: 32px;
		color: var(--whitish);
	}

	.quote {
		margin: 32px;
	}

	.results-wrapper {
		border-width: medium;
		border-color: var(--blackish);
		border-style: solid;
		border-radius: 8px;
		color: var(--whitish);
		padding: 16px;
	}
</style>
