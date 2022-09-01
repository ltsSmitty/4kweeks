<script>
	// style with a 10% gray colour.
	// find other style options at https://carbon-components-svelte.onrender.com/
	import 'carbon-components-svelte/css/g10.css';
	import { addUser } from './api/db/db';
	import {
		Select,
		SelectItem,
		DatePicker,
		DatePickerInput,
		Button
	} from 'carbon-components-svelte';
	import dayjs from 'dayjs';
	import { each } from 'svelte/internal';
	// import { sendSMS } from './api/sms/sms';

	let title = 'SMS sending test';
	let firstName, phoneNumber, dayChoice, birthday;
	const dayChoices = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let sel = dayChoices[1];

	const sendSMS = async (message) => {
		const myNum = '14074735068';
		const response = await fetch('/api/sms', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				msgBody: message,
				myNum
			})
		});
		let resp = await response.json();
		console.log(resp);
	};

	let validInput = false;
	const validatePhoneNumber = (phone) => {};

	let validDate;

	const validateDate = () => {
		console.log(birthday);
		validDate = dayjs(birthday).isValid();
		console.log(`validDate: ${validDate}`);
	};

	// $: validDate = !dayjs(birthday).isValid();

	const calculateWeeksFromBirthdayToToday = (birthday) => {
		const date1 = new Date(birthday);
		const now = new Date();
		const difference = now.getTime() - date1.getTime();
		const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
		const totalWeeks = Math.floor(totalDays / 7);
		return totalWeeks;
	};

	let weeksOld;
	$: weeksOld = calculateWeeksFromBirthdayToToday(birthday);

	$: validDate = dayjs(birthday).isValid();
</script>

<div class="index">
	<h2>{validDate}</h2>
	<p>
		{#if validDate}
			You're already {weeksOld} weeks old!
		{/if}
	</p>
	<button on:click={sendSMS(title)}> SMS me</button>
	<button on:click={addUser}> Add user to DB</button>
	<input type="text" bind:value={title} />

	<a href="/guides">View guides</a>
	<a href="about">About</a>
</div>

<div class="birthdayInput">
	<form class="birthday-form" on:submit|preventDefault={validateDate}>
		<label for="birthday" />
		<DatePicker on:change={(e) => (birthday = e.detail)}>
			<DatePickerInput
				for="birthday"
				invalid={false}
				invalidText="Invalid date"
				labelText="Date of birth"
				placeholder="mm/dd/yyyy"
				on:submit={(e) => (birthday = e.detail)}
			/>
		</DatePicker>
		<Button type="submit" disabled={!validDate}>Submit</Button>
	</form>
</div>

<div class="sign-up-form-div">
	<form class="sign-up-form" on:submit|preventDefault>
		<label for="firstName">First Name</label>
		<input bind:value={firstName} />

		<label for="phoneNumber">Phone Number</label>
		<input bind:value={phoneNumber} />

		<Select
			labelText="What day of the week would you like to receive texts?"
			on:change={(e) => (sel = e.detail)}
			selected={sel}
		>
			{#each dayChoices as dayz, i}
				<SelectItem value={dayz} />
			{/each}
		</Select>
	</form>
</div>
<div style="margin: var(--cds-layout-01) 0">
	Output: First Name: {firstName} <br />
	Birthday: {birthday}<br />
	Phone number: {phoneNumber}<br />
	Selected day: <strong>{sel}</strong>
</div>

<style>
	.index {
		text-align: center;
		display: block;
		margin: 20px auto;
	}
</style>
