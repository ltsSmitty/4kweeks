<script>
	// style with a 10% gray colour.
	// find other style options at https://carbon-components-svelte.onrender.com/
	import { Select, SelectItem, Button, Form } from 'carbon-components-svelte';
	import { birthday, weeksOld } from '$lib/stores';
	import * as db from '../api/db/db';
	import * as sms from '$lib/smsFrontendHelpers';

	let firstName, phoneNumber, dayChoice;
	const dayChoices = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let sel = dayChoices[1];

	const onSubmit = async () => {
		// hide the form
		let results = document.getElementById('info-form');
		results.style.display = 'none';
		// display some helpful text
		let submitElement = document.getElementById('form-submitted');
		submitElement.style.visibility = 'visible';

		const dayAsNumber = dayChoices.indexOf(sel); //translate Sunday = 0, Monday = 1, Tuesday = 2, etc.
		const body = {
			phone_number: phoneNumber,
			first_name: firstName,
			birthday: $birthday,
			message_day_preference: dayAsNumber,
			subscribed: true
		};
		try {
			return await new Response(JSON.stringify(db.upsertUser(body)));
		} catch (e) {
			console.log(`Error upserting user: ${e}`);
		}

		//send welcome SMS
		// sms.sendIntroSMS(phoneNumber, $weeksOld);
	};
</script>

<div class="info-form" id="info-form">
	<h4>Sign up to receive weekly motivational quotes to live your best life.</h4>
	<Form
		on:submit={(e) => {
			e.preventDefault();
			onSubmit();
		}}
	>
		<div class="form-wrapper">
			<div class="sign-up-form">
				<div class="first-name-container">
					<label for="firstName">First Name</label>
					<input bind:value={firstName} />
				</div>
				<div class="phone-number-container">
					<label for="phoneNumber">Phone Number</label>
					<input bind:value={phoneNumber} />
				</div>

				<Select
					labelText="What day of the week would you like to receive texts?"
					on:change={(e) => (sel = e.detail)}
					selected={sel}
				>
					{#each dayChoices as dayz, i}
						<SelectItem value={dayz} />
					{/each}
				</Select>
				<div class="button-wrapper">
					<Button type="submit">Submit</Button>
				</div>
			</div>
		</div>
	</Form>
</div>

<div class="form-submitted" id="form-submitted">
	<h3>
		Thanks for signing up! You'll receive a confirmation SMS shortly and weekly texts thereafter. Go
		live your best life!
	</h3>
</div>

<style>
	.info-form {
		position: relative;
		bottom: 0;
		text-align: center;
	}
	.form-wrapper {
		text-align: center;
		display: inline-block;
		position: relative;
	}

	.sign-up-form {
		width: 700px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		margin: 16px;
		align-items: center;
	}

	.form-submitted {
		margin: 16px;
		visibility: hidden;
		height: 200px;
	}

	.form-submitted > h3 {
		margin: auto;
		width: 80%;
	}
</style>
