<script>
	import { birthday, weeksOld } from '$lib/stores';
	import { calculateWeeksFromBirthdayToToday, calculateLastWeek } from '$lib/helpers';
	import ArrowUp from 'carbon-icons-svelte/lib/ArrowUp.svelte';

	$: month = $birthday.slice(0, 2).endsWith('/') ? $birthday.slice(0, 1) : $birthday.slice(0, 2);
	$: $weeksOld = calculateWeeksFromBirthdayToToday($birthday) || 2000;
	$: lastDate = calculateLastWeek($birthday);
	$: lastDaymdy = `${lastDate.slice(5, 7)}/${lastDate.slice(8, 10)}/${lastDate.slice(0, 4)}`;
</script>

<div class="wrapper">
	<div class="dateline-wrapper">
		<div
			class="dateline"
			style:background="linear-gradient(0.25turn, var(--light) {($weeksOld * 100) / 4000}%,
			var(--dark) {($weeksOld * 100) / 4000}%)"
		>
			<div class="year-start" style:left="{($weeksOld * 100) / 4000}%">
				<div class="month-start">
					<p class="week-marker">{$weeksOld} weeks lived</p>
					<div class="arrow">
						<ArrowUp size="24" />
					</div>
				</div>
			</div>
			<p class="first-day">{$birthday}</p>

			<p class="last-day">{lastDaymdy}</p>
		</div>
	</div>
</div>

<style>
	.wrapper {
		margin: 16px auto 5em;
		height: 100px;
	}

	.dateline-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		/* position: relative; */
	}

	.dateline {
		width: 80%;
		background-color: lime;
		height: 100px;
		position: relative;
	}

	.year-start {
		width: 1.3%;
		background-color: bisque;
		left: 20%;
		height: 100%;
		position: absolute;
		z-index: 1;
	}

	.month-start {
		visibility: none;
		width: 20%;
		background-color: var(--lime);
		height: 100%;
		z-index: 2;
		position: absolute;
	}

	.week-marker {
		background-color: var(--light);
		border: 0.1em solid;
		border-color: var(--blackish);
		position: absolute;
		transform: translate(-45%, 70%);
		width: max-content;
		top: 110%;
		padding: 2px;
		/* box-sizing: revert; */
	}

	.first-day {
		position: absolute;
		left: -5%;
		top: 110%;
	}

	.last-day {
		position: absolute;
		right: -5%;
		top: 110%;
	}

	.arrow {
		position: relative;
		transform: translate(-6px, -40%);
		top: 110%;
		padding: 2px;
	}
</style>
