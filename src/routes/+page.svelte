<script>
	import { DatePicker, DatePickerInput, Button } from 'carbon-components-svelte';
	import { analytics } from '$lib/stores';
	import { onMount } from 'svelte';
	import Dateline from './components/Dateline.svelte';
	import FoldingTimeline from './components/FoldingTimeline.svelte';
	import { birthday, weeksOld } from '$lib/stores';
	import Results from './components/Results.svelte';
	import Form from './components/Form.svelte';

	let anonymousId;
	let birthdayTemp;
	let isBirthdaySubmitted = false;

	const generateRandomBirthday = () => {
		let day = Math.floor(Math.random() * 29) + 1;
		let month = Math.floor(Math.random() * 11) + 1;
		let year = 2012 - Math.floor(Math.random() * 70);
		return `${month}/${day}/${year}`;
	};

	$birthday = generateRandomBirthday();

	onMount(async () => {
		anonymousId = (await analytics.user()).anonymousId();
	});
</script>

<FoldingTimeline />

<div class="intro">
	<h2 class="intro-text">The average human lives around four thousand weeks. Life is short.</h2>
</div>
<div class="hypothetical">
	<p class="h-text">If you were born on&nbsp;</p>
	<strong style:margin="8px 0"> {$birthday}</strong>
	<p>, this is your life's timeline.</p>
</div>
<Dateline />
<div class="cta-wrapper">
	<div class="cta-container">
		<h4 class="cta">Find out how many are weeks left in your life:</h4>
		<div class="date-picker">
			<DatePicker on:change bind:value={birthdayTemp}>
				<DatePickerInput
					labelText="Birthday"
					placeholder="mm/dd/yyyy"
					helperText="Example: 05/29/1887"
				/>
			</DatePicker>
		</div>

		<Button
			kind="secondary"
			type="submit"
			on:click={() => {
				$birthday = birthdayTemp || $birthday;
				// TODO validate birthday then hide this whole div

				//shrink the birthday input
				let thisDiv = document.getElementsByClassName('cta-wrapper')[0];
				thisDiv.style.transform = `scale(0)`;
				thisDiv.style.transformOrigin = ' 25%  0';
				thisDiv.style.transition = `transform 1.5s`;
				setTimeout(() => {
					thisDiv.style.display = 'none';
				}, 800);

				// expand the datepicker
				isBirthdaySubmitted = true;

				// TODO track submission
			}}
			size="field">Submit</Button
		>
	</div>
</div>

<div class="results">
	<Results {isBirthdaySubmitted} />
</div>

<div class="form-wrapper" style:display={!isBirthdaySubmitted ? 'none' : 'initial'}>
	<Form {isBirthdaySubmitted} />
</div>

<style>
	.form-wrapper {
		display: flex;
	}

	.intro {
		align-items: center;
		justify-content: center;
		background-color: var(--light);
	}
	.intro-text {
		width: 80%;
		margin: auto;
	}

	.cta-wrapper {
		/* background-color: lime; */
		height: 128px;
		left: 20%;
		justify-content: center;
		position: relative;
		padding: 16px;
		margin: 16px;
	}

	.cta-container {
		display: flex;
		/* text-align: center; */
		/* padding: 0 70px; */
	}

	.cta-container > * {
		padding: 8px;
		/* background-color: aqua; */
		/* position: relative; */
	}

	.cta {
		margin-top: 32px;
	}

	.results {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hypothetical {
		margin: 24px 0 0 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font: 4em;
	}
</style>
