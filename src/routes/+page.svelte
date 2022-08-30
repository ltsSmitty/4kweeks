<script>
	let title = 'SMS sending test';

	const updateTitle = () => {
		title = 'something completely different';
	};

	const sendSMS = async () => {
		const msgBody = title;
		const myNum = '14074735068';
		const response = await fetch('/api/sms', {
			// const response = await fetch('/api/sms', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				msgBody,
				myNum
			})
		});
		let resp = await response.json();
		console.log(resp);
	};
</script>

<div class="index">
	<h2>{title}</h2>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
		voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</p>
	<button on:click={sendSMS}> click me</button>
	<!-- <button on:click={() => console.log(`button clicked`)}> add user to database</button> -->
	<input type="text" bind:value={title} />

	<a href="/guides">View guides</a>
	<a href="about">About</a>
</div>

<style>
	.index {
		text-align: center;
		display: block;
		margin: 20px auto;
	}
</style>
