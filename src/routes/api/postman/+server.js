import { error } from '@sveltejs/kit';
import { calculateWeeksFromBirthdayToToday, getMessageForWeek } from '$lib/helpers';
import { getUsersbySubscriptionDay } from '../db/dbExports';

export const POST = async ({ request }) => {
	// get all the people from the database with the given day
	try {
		const props = await request.json();
		console.log(`inside the server: ${JSON.stringify(props)}`);
		// expect props to be e.g. { "message_day_preference": "0"}
		if (!props.message_day_preference) {
			throw error(
				500,
				`message_day_preference incorrectly supplied. Expecting { "message_day_preference": "0"}`
			);
		}
		const messageDay = props.message_day_preference;
		const people = await getUsersbySubscriptionDay(props);
		console.log(`number of people with day ${messageDay}: ${people.length}`);
		// filter to make sure they're subscribed and have a valid phone number
		const validPeople = people.filter(
			(person) => person.phone_number && person.subscribed && person.birthday
		);
		console.log(`People subscribed for messaging: ${validPeople.length}`);
		// translate birthday into the proper week
		const peopleWithWeeks = validPeople.map((person) => {
			person.weeks = calculateWeeksFromBirthdayToToday(person.birthday);
			return person;
		});
		// match them with the proper quotes
		const messages = await getMessageData(peopleWithWeeks);
		console.log(`messages: ${await messages.map((message) => JSON.stringify(message))}`);

		// log the responses
		const successes = messages.filter((message) => message.status === 'fulfilled');
		console.log(
			`Successfully got messages for ${successes.length} of ${peopleWithWeeks.length} people.`
		);

		//

		//return a success message
		const message = JSON.stringify(
			`${validPeople.length} were valid for messaging for day ${messageDay}. Messages were successfully gotten for ${successes.length} of them.`
		);
		return await new Response(message);
	} catch (err) {
		throw error(500, `Unable to connect for some reason: ${err}`);
	}
};

const getMessageData = async (people) => {
	return Promise.allSettled(
		people.map(async (person) => {
			return { message: await getMessageForWeek(person.weeks), person };
		})
	);
};

export const test = () => console.log(`test`);
