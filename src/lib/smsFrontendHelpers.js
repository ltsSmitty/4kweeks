export const sendTestSMS = async (message) => {
	const myNum = '4074735068';
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

export const sendIntroSMS = async (phoneNumber, weeksOld) => {
	const toNum = phoneNumber;
	const response = await fetch('/api/sms', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			toNum,
			method: 'introMessage',
			weeksOld
		})
	});
	let resp = await response.json();
	console.log(resp);
};

export const sendWeeklySMS = async (data) => {
	const toNum = data.phoneNumber;
	const response = await fetch('/api/sms', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			toNum,
			method: 'weeklyMessage'
		})
	});
	let resp = await response.json();
	console.log(resp);
};
