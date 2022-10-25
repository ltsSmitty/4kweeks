import Analytics from 'analytics-node';
var analytics = new Analytics('GRjitKsHLpyTNvEnci1lLqZC18omDbIy', { flushAt: 1 });
// import { analytics } from '$lib/stores';

export const userCreated = (user) => {
	const { phone_number, first_name, birthday, message_day_preference, sms_subscription_status } =
		user;
	analytics.identify({
		userId: phone_number,
		phone: phone_number,
		traits: {
			name: first_name,
			phoneNumber: phone_number,
			birthday,
			message_day_preference,
			sms_subscription_status
		}
	});
	analytics.track({
		userId: phone_number,
		event: 'User Created',
		properties: {
			phone: phone_number,
			message_day_preference,
			sms_subscription_status
		}
	});
};

const birthdaySet = (birthday) => {
	analytics.identify({
		anonymousId: 'asdfasdf',
		traits: {
			birthday: birthday
		}
	});
	analytics.track({
		anonymousId: '121212122',
		event: 'Birthday Set',
		properties: {
			birthday
		}
	});
};

export const firstNameSet = (firstName) => {
	analytics.track('First Name Set', { firstName });
};

export const phoneNumberSet = (phoneNumber) => {
	analytics.track('Phone Number Set', { phoneNumber });
};

export const smsSent = ({ toNumber, msgBody }) => {
	console.log(`inside smsSent` + toNumber, msgBody);
	analytics.track({
		event: 'SMS Sent',
		userId: toNumber,
		properties: {
			messageBody: msgBody
		}
	});
};
