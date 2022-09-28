import messageDB from '$lib/messageDB.json';

export const calculateWeeksFromBirthdayToToday = (birthday) => {
	const date1 = new Date(birthday);
	const now = new Date();
	const difference = now.getTime() - date1.getTime();
	const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
	const totalWeeks = Math.floor(totalDays / 7);
	return totalWeeks;
};

export const calculateLastWeek = (birthday) => {
	const bday = new Date(birthday);
	const secondsInADay = 1000 * 3600 * 24;
	let lastDay = new Date();
	lastDay.setTime(bday.getTime() + 4000 * 7 * secondsInADay);
	if (!lastDay.getTime()) {
		lastDay = new Date();
	}
	const parsedDate =
		lastDay.toISOString().split('T')[0] ?? lastDay ?? new Date().toISOString().split('T')[0];
	return parsedDate;
};

export const getMessageForWeek = async (weekNumber) => {
	let body = messageDB.messages.find((el) => el.id === Number(weekNumber))?.message;
	let message = body;
	let messageFound = true;

	if (!message) {
		const { text, author } = await getRandomQuote();
		messageFound = false;
		message = `${text} - ${author}`;
	}
	return { message, messageFound };
};

const getRandomQuote = async () => {
	const resp = await (await fetch('https://type.fit/api/quotes')).json();
	// pick a random quote
	const quoteIndex = Math.floor(Math.random() * resp.length);
	return resp[quoteIndex];
};
