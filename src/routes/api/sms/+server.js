import { error } from '@sveltejs/kit';
import twilio from 'twilio';
import { env } from '$env/dynamic/private';
import { smsSent } from '$lib/segmentEvents';

const client = twilio(env.SVELTEKIT_TWILIO_ACCOUNT_SID, env.SVELTEKIT_TWILIO_AUTH_TOKEN);

export const POST = async ({ request }) => {
	try {
		// console.log(api.length);
		const smsProps = await request.json();
		console.log(`inside the server: ${JSON.stringify(smsProps)}`);

		let { myNum, msgBody } = smsProps;
		myNum = await validatePhoneNumber(myNum);
		try {
			const { sid } = await client.messages.create({
				from: env.SVELTEKIT_TWILIO_PHONE_NUMBER,
				to: myNum,
				body: msgBody
			});

			console.log(`sid: ${sid}`);
			if (sid) {
				smsSent({ toNumber: myNum, msgBody });
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

export const validatePhoneNumber = async (number) => {
	try {
		let phoneNumberStatus = await client.lookups.v1
			.phoneNumbers(number)
			.fetch({ countryCode: 'US' });
		console.log(
			`Validating phone number. Given number ${number} became ${phoneNumberStatus.phoneNumber}.`
		);
		return phoneNumberStatus.phoneNumber;
	} catch (err) {
		throw err(404, `Error validating phone number: ${err}`);
	}
};
