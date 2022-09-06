// type DBMethod = 'getUser' | 'upsertUser'
// export type DBMessage = {
// 	phone_number: number | string,
// 	first_name?: string,
// 	birthday?: string,
// 	message_day_preference?: number,
// 	subscribed?: boolean
// }

export const upsertUser = async (user) => {
	// export const upsertUser = async (user: DBMessage) => {
	return await queryDb({ method: 'upsertUser', body: user });
};

export const getUser = async (phone_number) => {
	// export const getUser = async (phone_number: number) => {
	return await queryDb({ method: 'getUser', body: { phone_number } });
};

export const getUsersbySubscriptionDay = async (day) => {
	return await queryDb({
		method: 'getUsersbySubscriptionDay',
		body: { message_day_preference: day }
	});
};

const queryDb = async ({ method, body }) => {
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
};
