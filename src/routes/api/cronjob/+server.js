import { error } from '@sveltejs/kit';
import { getRandomQuote } from '$lib/helpers';
// import * as api from '$lib/api';

export const prerender = false;

export const POST = async () => {
	// get the date
	try {
		// console.log(api.length);
		const day = new Date().getDay();
		console.log(`cron job initiated on ${day} at ${new Date()}`);
		// const data = await db.getUsersbySubscriptionDay({ message_day_preference: 1 });
		// console.log(`data: ${JSON.stringify(await data)}`);
		let quote = await getRandomQuote();
		console.log(`quote: ${quote}`);

		return await new Response(JSON.stringify(`Cron job started at ${new Date()}`));
	} catch (err) {
		throw error(500, `Improper post, likely POST body was not json. ${err} ${err.stack}`);
	}
};
