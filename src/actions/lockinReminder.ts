import { sendMessage } from "../apiTelegram";
import getQuote from "../getRandomQuote";
import randomPhrase from "../utils/randomPhrases";

const lockInReminder = async function (
	currentMinute: number,
	times: number[],
	todayKey: string,
	sentForMinute: any,
	allUsers: any
) {
	for (let i = 0; i < times.length; i++) {
		if (currentMinute > times[i]) continue;

		if (
			currentMinute === times[i] &&
			sentForMinute[`${todayKey}:${currentMinute}`]
		) {
			// Perfect place to generate quote
			const { q, a } = await getQuote();
			const message = `${randomPhrase()}\n\n${q} \n\n <b>${a}</b>`;

			for (let j = 0; j < allUsers.length; j++) {
				console.log(allUsers, "ALLUSERS");

				await sendMessage(message, allUsers[j].key.split(":")[0]);
				await new Promise((resolve) => setTimeout(resolve, 5000));
			}

			sentForMinute[`${todayKey}:${currentMinute}`] = true;
		}
	}
};

export default lockInReminder;
