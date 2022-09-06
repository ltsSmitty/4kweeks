<script>
	// style with a 10% gray colour.
	// find other style options at https://carbon-components-svelte.onrender.com/
	import 'carbon-components-svelte/css/g10.css';
	import {
		Select,
		SelectItem,
		DatePicker,
		DatePickerInput,
		Button,
		Form
	} from 'carbon-components-svelte';
	import { each } from 'svelte/internal';
	import { birthday } from '$lib/stores';

	let firstName, phoneNumber, dayChoice;
	const dayChoices = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let sel = dayChoices[1];
</script>

<div class="info_form">
	<Form>
		<div class="birthdayInput">
			<form class="birthday-form" on:submit|preventDefault>
				<label for="birthday" />
				<DatePicker on:change={(e) => ($birthday = e.detail)}>
					<DatePickerInput
						for="birthday"
						invalid={false}
						invalidText="Invalid date"
						labelText="Date of birth"
						placeholder="mm/dd/yyyy"
						on:submit={(e) => ($birthday = e.detail)}
					/>
				</DatePicker>
				<Button type="submit">Submit</Button>
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
	</Form>
</div>
