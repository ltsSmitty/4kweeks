import { createClient } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const supabase = createClient(env.SVELTEKIT_SUPABASE_URL, env.SVELTEKIT_SUPABASE_SEC_KEY);

export const GET = async (userData) => {
	const { id, phone_number } = await userData;

	// if id given
	let body;
	if (id) {
		body = { column: 'id', value: id };
	} else if (phone_number) {
		body = { column: 'phone_number', value: phone_number };
	}

	if (body) {
		let { data, err } = await supabase
			.from('User')
			.select(body.column)
			.filter(body.column, 'eq', body.value);
		if (err) {
			console.log(`error: ${err}`);
			throw error(err);
		}
		return await new Response(JSON.stringify(data));
	}
	return new Response(JSON.stringify({}));
};

export const POST = async ({ request }) => {
	try {
		const data = await request.json();
		if (data) {
			console.log(`server, userData: ${JSON.stringify(data)}`);
			const { first_name, phone_number, birthday, message_day_preference, subscribed } = data;
			const resp = await supabase.from('User').insert([
				{
					first_name,
					phone_number,
					birthday,
					message_day_preference,
					subscribed
				}
			]);
			console.log(`supabase response: ${await JSON.stringify(resp)}`);
			return await new Response(JSON.stringify(resp));
		}
		return await new Response(JSON.stringify(`No data posted.`));
	} catch (err) {
		// console.error(err);
		throw error(500, `failed: ${err}`);
	}
};
