import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { userCreated } from '$lib/segmentEvents';

const supabase = createClient(env.SVELTEKIT_SUPABASE_URL, env.SVELTEKIT_SUPABASE_SEC_KEY);

export const upsertUser = async (queryBody) => {
	try {
		// segment track "User Created"
		try {
			userCreated(queryBody);
		} catch (e) {
			console.log(`Error with analytics.js: ${e}`);
		}

		// upsert user to supabase
		const { data } = await supabase.from('User').upsert([queryBody]);
		console.log(`supabase response: ${await JSON.stringify(data)}`);

		return await data;
	} catch (err) {
		console.log(`An error occurred with supabase: ${err}`);
		return null;
	}
};

export const getUser = async (queryBody) => {
	const { data } = await supabase
		.from('User')
		.select('*')
		.filter('phone_number', 'eq', queryBody.phone_number);
	console.log(`supabase response: ${await JSON.stringify(data)}`);
	return data;
};

export const getUsersbySubscriptionDay = async (queryBody) => {
	const day = queryBody.message_day_preference;
	console.log(`day: ${JSON.stringify(day)}`);
	const { data } = await supabase
		.from('User')
		.select('*')
		.filter('message_day_preference', 'eq', day);
	console.log(`supabase response: ${await JSON.stringify(data)}`);
	return data;
};

export const deleteRows = async (numRows) => {
	const { data } = supabase.from('User').delete('*');
};
