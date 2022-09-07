import { error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	// get the date
	try {
		// const postProps = await request;
		// console.log(JSON.stringify(postProps.));
		const day = new Date().getDay();
		console.log(`cron job initiated on ${day} at ${new Date()}`);
		// beginScheduledSend(day);
		return await new Response(JSON.stringify(`done`));

		// try {
		// 	const smsProps = await request.json();
		// 	console.log(`inside the server: ${JSON.stringify(smsProps)}`);

		// 	const { myNum, msgBody } = smsProps;
		// 	try {
		// 		const { sid } = await client.messages.create({
		// 			from: env.SVELTEKIT_TWILIO_PHONE_NUMBER,
		// 			to: myNum,
		// 			body: msgBody
		// 		});

		// 		console.log(`sid: ${sid}`);
		// 		if (sid) {
		// 			smsSent({ toNumber: myNum, msgBody });
		// 			return await new Response(JSON.stringify(`SMS send to ${myNum}. Message SID: ${sid}`));
		// 		}
		// 	} catch (err) {
		// 		console.error(err);
		// 		throw error(404, 'Failed to send SMS. Check server logs for more details.');
		// 	}

		// 	return await new Response(JSON.stringify(`done`));
	} catch (err) {
		throw error(500, `Improper post, likely POST body was not json. ${err}`);
	}
};
