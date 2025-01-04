import { sendMessage } from "../apiTelegram";
import getQuote from "../getRandomQuote";
import delay from "../utils/delay";
import formatTimeFromMinute from "../utils/formatTimeFromMinute";
import randomPhrase from "../utils/randomPhrases";

const sentForMinute: any = {};

const lockInReminder = async function (
	currentMinute: number,
	times: number[],
	todayKey: string,
	allUsers: any,
	nextMessageTime: number
) {
	for (let i = 0; i < times.length; i++) {
		if (currentMinute > times[i]) continue;

		if (
			currentMinute === times[i] &&
			!sentForMinute[`${todayKey}:${currentMinute}`]
		) {
			const { q, a } = await getQuote();
			const message = `${randomPhrase()}\n\n${q} \n\n <b>${a}</b>`;

			for (let j = 0; j < allUsers.length; j++) {
				console.log("All users", allUsers);

				const id = allUsers[j].key.split(":")[0];

				sentForMinute[`${todayKey}:${currentMinute}`] = true;

				// TODO Change this to async await
				sendMessage(message, id)
					.then(() =>
						delay(5).then(() =>
							sendMessage(
								`I will remind you to lock in again by ${formatTimeFromMinute(
									nextMessageTime!
								)} \n <b>So you dont slack off again 💀 🫵</b>`,
								id,
								"HTML"
							)
						)
					)
					.catch((err) => {
						sentForMinute[`${todayKey}:${currentMinute}`] = false;
					});
			}
		}
	}
};

export default lockInReminder;
