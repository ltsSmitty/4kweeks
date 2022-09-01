export const addUser = async () => {
	const response = await fetch('/api/db', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			phone_number: '4074735068',
			first_name: 'Smitty'
		})
	});
	let resp = await response.json();
	console.log(resp);
};
