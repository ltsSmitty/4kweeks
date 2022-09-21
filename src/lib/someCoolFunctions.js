import { error } from '.svelte-kit';
import { calculateWeeksFromBirthdayToToday, getMessageForWeek } from '$lib/helpers';
import { getUsersbySubscriptionDay } from 'src/routes/api/db/dbExports';

export const runDaily = async ({ message_day_preference }) => {
	// get all the people from the database with the given day
	try {
		const data = await getUsersbySubscriptionDay(message_day_preference);

		const people = JSON.parse(data);
		console.log(`number of people with day ${message_day_preference}: ${people.length}`);
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
		console.log(`messages: ${messages}`);

		// log the responses
	} catch (err) {
		throw error(500, `Unable to connect for some reason: ${err}`);
	}
};

const getMessageData = async (people) => {
	return Promise.allSettled(people.map((person) => getMessageForWeek(person.weeks)));
};

export const test = () => console.log(`test`);
