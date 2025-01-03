import { sendMessage } from "../apiTelegram";
import getQuote from "../getRandomQuote";
import randomPhrase from "../utils/randomPhrases";

const sentForMinute: any = {};
const lockInReminder = async function (
	currentMinute: number,
	times: number[],
	todayKey: string,
	allUsers: any
) {
	for (let i = 0; i < times.length; i++) {
		if (currentMinute > times[i]) continue;

		if (
			currentMinute === times[i] &&
			sentForMinute[`${todayKey}:${currentMinute}`]
		) {
			const { q, a } = await getQuote();
			const message = `${randomPhrase()}\n\n${q} \n\n <b>${a}</b>`;

			for (let j = 0; j < allUsers.length; j++) {
				sendMessage(message, allUsers[j].key.split(":")[0]);
			}

			sentForMinute[`${todayKey}:${currentMinute}`] = true;
		}
	}
};

export default lockInReminder;
