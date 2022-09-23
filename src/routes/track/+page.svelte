<script>
	import { DatePicker, DatePickerInput, Button } from 'carbon-components-svelte';
	import { analytics } from '$lib/stores';
	import { onMount } from 'svelte';
	import Dateline from '../components/Dateline.svelte';
	import FoldingTimeline from '../components/FoldingTimeline.svelte';
	import { birthday } from '$lib/stores';
	import Results from '../components/Results.svelte';
	let anonymousId;
	let birthdayTemp;
	onMount(async () => {
		$birthday = '03/22/1993';
		anonymousId = (await analytics.user()).anonymousId();
	});
</script>

<FoldingTimeline />

<div class="intro">
	<h2 class="intro-text">The average human lives around four thousand weeks. Life is short.</h2>
</div>

<Dateline />
<div class="wrapper">
	<div class="cta-container">
		<h4 class="cta">Find out how many are weeks left in your life:</h4>
		<div class="date-picker">
			<DatePicker on:change bind:value={birthdayTemp}>
				<DatePickerInput
					labelText="Birthday"
					placeholder="mm/dd/yyyy"
					helperText="Example: 05/12/1887"
				/>
			</DatePicker>
		</div>

		<Button kind="secondary" on:click={() => ($birthday = birthdayTemp || $birthday)} size="field"
			>Submit</Button
		>
	</div>
</div>

<Results />

<style>
	.intro {
		align-items: center;
		justify-content: center;
		background-color: var(--light);
	}
	.intro-text {
		width: 80%;
		margin: auto;
	}

	.wrapper {
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
		padding: 16px;
		/* background-color: aqua; */
		/* position: relative; */
	}

	.cta {
		margin-top: 32px;
	}
</style>
