import { error } from '@sveltejs/kit';

export const upsertUser = async (user) => {
	// export const upsertUser = async (user: DBMessage) => {
	return await queryDb({ method: 'upsertUser', body: user });
};

export const getUser = async (phone_number) => {
	// export const getUser = async (phone_number: number) => {
	return await queryDb({ method: 'getUser', body: { phone_number } });
};

export const getUsersbySubscriptionDay = async (day) => {
	console.log(`day: ${day}`);
	return await queryDb({
		method: 'getUsersbySubscriptionDay',
		body: { message_day_preference: day }
	});
};

const queryDb = async ({ method, body }) => {
	try {
		console.log(`in queryDB, attempting to fetch`);
		const response = await fetch('/api/db', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				method,
				body
			})
		});
		let resp = await response.json();
		console.log(resp);
		return await new Response(JSON.stringify(resp));
	} catch (err) {
		console.log(`Error querying the DB: ${err}`);
		return await new Response(JSON.stringify(err));
	}
};
