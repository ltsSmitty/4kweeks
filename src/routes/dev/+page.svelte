<script>
	import { onMount } from 'svelte';
	import { analytics, birthday } from '$lib/stores';
	import { calculateWeeksFromBirthdayToToday } from '$lib/helpers';
	import * as db from '../api/db/db';
	import Form from '../components/Form.svelte';

	let title = 'SMS sending test';
	let sel = 0;

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

	let firstName = 'p',
		phoneNumber = Math.floor(Math.random() * 10000000000),
		dayChoice,
		validDate;

	let weeksOld;
	$: weeksOld = calculateWeeksFromBirthdayToToday(birthday);

	const handleSubmit = () => {
		const body = {
			phone_number: phoneNumber,
			first_name: firstName,
			birthday: '04/24/1990',
			message_day_preference: dayChoice,
			subscribed: true
		};
		db.upsertUser(body);
	};

	const getUser = async () => {
		let user = await db.getUser(phoneNumber);
		console.log(user);
	};

	let message_day_preference = 0;
	const getUsersbySubscriptionDay = async () => {
		console.log(`attempting to get users with day ${message_day_preference}`);
		let user = await db.getUsersbySubscriptionDay(message_day_preference);
		console.log(user);
	};

	const fakeStartCronJob = async () => {
		const response = await fetch('/api/cronjob', {
			method: 'POST'
		});
		let resp = await response.json();
		console.log(`cron job response: ${resp}`);
	};

	let anonymousId;
	onMount(async () => {
		anonymousId = (await analytics.user()).anonymousId();
	});
</script>

<div class="index">
	<h2>{validDate}</h2>
	<p>
		{#if validDate}
			You're already {weeksOld} weeks old!
		{/if}
	</p>
	<button on:click={sendSMS(title)}> SMS me</button>
	<button on:click={handleSubmit}> Add user to DB</button>
	<br />
	<button on:click={getUser}> Get user with phone number</button>
	<br />
	<button on:click={fakeStartCronJob}> Fake start cron job.</button>
	<br />
	<button on:click={getUsersbySubscriptionDay}> Get users with the given day</button>
	<input type="text" bind:value={message_day_preference} /><br />

	<input type="text" bind:value={title} />

	<a href="/guides">View guides</a>
	<a href="about">About</a>
</div>
<Form on:submit={(e) => ($birthday = e.detail)} />

<div style="margin: var(--cds-layout-01) 0">
	Output: First Name: {firstName} <br />
	Birthday: {$birthday}<br />
	Phone number: {phoneNumber}<br />
	Selected day: <strong>{sel}</strong><br />
</div>

<style>
	.index {
		text-align: center;
		display: block;
		margin: 20px auto;
	}
</style>
