import { error } from '@sveltejs/kit';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const POST = async ({ request }) => {
	try {
		const smsProps = await request.json();
		console.log(`inside the server: ${JSON.stringify(smsProps)}`);

		const { myNum, msgBody } = smsProps;
		try {
			const { sid } = await client.messages.create({
				from: process.env.TWILIO_PHONE_NUMBER,
				to: myNum,
				body: msgBody
			});

			console.log(`sid: ${sid}`);
			if (sid) {
				return await new Response(JSON.stringify(`SMS send to ${myNum}. Message SID: ${sid}`));
			}
		} catch (err) {
			console.error(err);
			throw error(404, 'Failed to send SMS. Check server logs for more details.');
		}

		return await new Response(JSON.stringify(`done`));
	} catch (err) {
		throw error(500, `Improper post, likely POST body was not json. ${err}`);
	}
};
