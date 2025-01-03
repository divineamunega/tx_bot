import { configDotenv } from "dotenv";
import { getUpdates, sendMessage } from "./apiTelegram";
import randomTimes from "./utils/randomTimes";
import { startRedis, searchRedis } from "./redis";
import formatTimeFromMinute from "./utils/formatTimeFromMinute";
import getQuote from "./getRandomQuote";
import randomPhrase from "./utils/randomPhrases";
import currentMinute from "./utils/getCurrentMinute";
import getCurrentMinute from "./utils/getCurrentMinute";
import greetWelcome from "./actions/greetWelcome";

configDotenv({ path: ".env" });

const times = randomTimes(12).sort((a, b) => a - b);
const sentForMinute: any = {};

(async () => {
	const client = await startRedis();
	const todayKey = `${new Date().getFullYear()}:${new Date().getMonth()}:${new Date().getDate()}`;

	while (true) {
		const currentMinute = getCurrentMinute();
		const updates = await getUpdates();
		const allUsers = await searchRedis(client, "*:init", "true");

		// Greet all new users a custom welcome message
		updates?.length &&
			(await greetWelcome(updates, client, times, currentMinute));

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

		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
})();
