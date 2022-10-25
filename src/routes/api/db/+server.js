import { error } from '@sveltejs/kit';
import * as db from './dbExports';

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
				sms_subscription_status: subscribed ? 'subscribed' : ''
			};
			console.log(`switching on method '${method}'`);
			switch (method) {
				case 'getUser': {
					return await new Response(JSON.stringify(await db.getUser(queryBody)));
				}
				case 'upsertUser': {
					return await new Response(JSON.stringify(await db.upsertUser(queryBody)));
				}
				case 'getUsersbySubscriptionDay': {
					return await new Response(JSON.stringify(await db.getUsersbySubscriptionDay(queryBody)));
				}
				case 'deleteAllUsers': {
					return await new Response(`Nothing written yet.`);
				}
				case 'deleteUser': {
					return await new Response(`Nothing written yet.`);
				}
			}
		}
		console.log(`no data posted`);
		return await new Response(JSON.stringify(`No data posted.`));
	} catch (err) {
		console.log(`err${err}`);
		throw error(500, `failed: ${err}`);
	}
};
