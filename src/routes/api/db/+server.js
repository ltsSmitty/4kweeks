import { createClient } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { userCreated } from '$lib/segmentEvents';
import messageDB from '$lib/messageDB.json';

const supabase = createClient(env.SVELTEKIT_SUPABASE_URL, env.SVELTEKIT_SUPABASE_SEC_KEY);

export const POST = async ({ request }) => {
	try {
		const req = await request.json();
		if (req) {
			console.log(req);
			const { first_name, phone_number, birthday, message_day_preference, subscribed } = req.body;
			const { method } = req;
			const queryBody = {
				first_name,
				phone_number,
				birthday,
				message_day_preference,
				subscribed: subscribed
			};
			console.log(`switching on method '${method}'`);
			switch (method) {
				case 'getUser': {
					return getUser(queryBody);
				}
				case 'upsertUser': {
					return upsertUser(queryBody);
				}
				case 'getUsersbySubscriptionDay': {
					return getUsersbySubscriptionDay(queryBody);
				}
			}
			// const { data } = await supabase.from('User').upsert([queryBody]);
			// console.log(`supabase response: ${await JSON.stringify(data)}`);
			// if (await data) userCreated(queryBody);
			// return await new Response(JSON.stringify(data));
		}
		console.log(`no data posted`);
		return await new Response(JSON.stringify(`No data posted.`));
	} catch (err) {
		// console.error(err);
		console.log(`err${err}`);
		throw error(500, `failed: ${err}`);
	}
};

const upsertUser = async (queryBody) => {
	const { data } = await supabase.from('User').upsert([queryBody]);
	console.log(`supabase response: ${await JSON.stringify(data)}`);
	if (await data) userCreated(queryBody);
	return await new Response(JSON.stringify(data));
};

const getUser = async (queryBody) => {
	const { data } = await supabase
		.from('User')
		.select('*')
		.filter('phone_number', 'eq', queryBody.phone_number); // upsert([await queryBody]);
	console.log(`supabase response: ${await JSON.stringify(data)}`);
	return await new Response(JSON.stringify(data));
};

const getUsersbySubscriptionDay = async (queryBody) => {
	console.log(`qb: ${JSON.stringify(queryBody)}`);
	const { data } = await supabase
		.from('User')
		.select('*')
		.filter('message_day_preference', 'eq', queryBody.message_day_preference);
	console.log(`supabase response: ${await JSON.stringify(data)}`);
	// console.log(`messages: ${JSON.stringify(messages)}`);
	getMessageForWeek(queryBody.message_day_preference);
	return await new Response(JSON.stringify(data));
};

const getMessageForWeek = async (weekNumber) => {
	let body = messageDB.messages.find((el) => el.id === Number(weekNumber))?.message;
	let thisMessage = body;

	if (!thisMessage) {
		const { text, author } = await getRandomQuote();
		thisMessage = `That message hasn't been written yet, but here's a good one: \n${text} - ${author}`;
	}
	return thisMessage;
};

const getRandomQuote = async () => {
	const resp = await (await fetch('https://type.fit/api/quotes')).json();
	// pick a random quote
	const quoteIndex = Math.floor(Math.random() * resp.length);
	return resp[quoteIndex];
};
