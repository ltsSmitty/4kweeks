<script>
	import { Theme, DatePicker, DatePickerInput, FormLabel } from 'carbon-components-svelte';
	import { birthday } from '$lib/stores';
	import { calculateWeeksFromBirthdayToToday, calculateLastWeek } from '$lib/helpers';
	import 'carbon-components-svelte/css/all.css';
	let xPos = 50;
	let yPos = 50;

	$: left = `${xPos}%`;
	$: top = `${yPos}%`;

	$: year = $birthday.slice(0, 4);
	$: month = $birthday.slice(5, 7);
	$: day = $birthday.slice(8, 10);
	$: currentWeek = calculateWeeksFromBirthdayToToday($birthday);
	$: lastDate = calculateLastWeek($birthday);
</script>

<div class="wrapper">
	<div class="dateline-wrapper">
		<div class="dateline">
			<div class="year-start" style:left="{(currentWeek * 100) / 4000}%">
				<div class="month-start" style:left="{(month * 100) / 12}%">
					<p class="week-marker">{currentWeek} weeks lived</p>
				</div>
			</div>

			<p class="day-born">{$birthday}</p>
			<p class="last-day">{lastDate}</p>
		</div>
	</div>
</div>

<DatePicker on:change bind:value={$birthday}>
	<DatePickerInput labelText="Birthday" placeholder="mm/dd/yyyy" helperText="Example: 05/12/1887" />
</DatePicker>

<label for="birthday">Birthday</label>
<input type="date" for="birthday" bind:value={$birthday} />

<label for="positionX">X </label>
<input id="positionX" type="range" bind:value={xPos} />

<label for="positionY">Y </label>
<input id="positionY" type="range" bind:value={yPos} />

<!-- This is optimized the same way as the original example -->
<div class="box" style:left style:top>
	({xPos}, {yPos}) Birthday: {$birthday}
	Weeks so far: {currentWeek}
	{lastDate}
</div>

<style>
	.box {
		height: 80px;
		width: 80px;
		background: pink;
		position: absolute;
	}
	.wrapper {
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
		width: 20%;
		background-color: blue;
		height: 100%;
		z-index: 2;
		position: absolute;
	}
</style>
