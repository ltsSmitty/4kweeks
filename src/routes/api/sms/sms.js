export const sendSMS = async (message) => {
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
