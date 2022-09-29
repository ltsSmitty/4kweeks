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

		let { toNum, msgBody, method, weeksOld } = smsProps;
		toNum = await validatePhoneNumber(toNum);

		try {
			switch (method) {
				case 'introMessage': {
					sendIntroMessage(toNum, weeksOld);
					break;
				}
				case 'weeklyMessage': {
					break;
				}
				default: {
					sendTestMessage(toNum, msgBody);
					break;
				}
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

const sendIntroMessage = async (phoneNumber, weeksOld) => {
	const introMessage = `You've signed up to receive weekly SMS messages with inspirational quotes from 4k Weeks. Make the best of your remaining ${
		4000 - weeksOld
	} weeks. Message STOP to unsubscribe.`;
	return await sendMessage(phoneNumber, introMessage);
};

const sendTestMessage = async (phoneNumber, msgBody) => {
	return await sendMessage(phoneNumber, msgBody);
};

const sendMessage = async (phoneNumber, msgBody) => {
	const { sid } = await client.messages.create({
		from: env.SVELTEKIT_TWILIO_PHONE_NUMBER,
		to: phoneNumber,
		body: msgBody
	});

	if (sid) {
		smsSent({ toNumber: phoneNumber, msgBody });
		return await new Response(JSON.stringify(`SMS send to ${phoneNumber}. Message SID: ${sid}`));
	}
};
