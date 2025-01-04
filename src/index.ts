import { configDotenv } from "dotenv";
import { getUpdates } from "./apiTelegram";
import randomTimes from "./utils/randomTimes";
import { startRedis, searchRedis } from "./redis";
import getCurrentMinute from "./utils/getCurrentMinute";
import greetWelcome from "./actions/greetWelcome";
import lockInReminder from "./actions/lockinReminder";
import delay from "./utils/delay";

configDotenv({ path: ".env" });

const times = randomTimes(12).sort((a, b) => a - b);

(async () => {
	try {
		const client = await startRedis();
		const todayKey = `${new Date().getFullYear()}:${new Date().getMonth()}:${new Date().getDate()}`;

		while (true) {
			const currentMinute = getCurrentMinute();
			const updates = await getUpdates(); // Get Updates from Telegram
			const allUsers = await searchRedis(client, "*:init", "true");
			const nextMessageTime =
				times.find((time) => time > +currentMinute) || Math.min(...times);

			// Greet all new users a custom welcome message
			updates?.length && (await greetWelcome(updates, client, nextMessageTime));

			// Remind users to lock in at the random times
			await lockInReminder(
				currentMinute,
				times,
				todayKey,
				allUsers,
				nextMessageTime
			);

			await delay(3);
		}
	} catch (err: any) {
		console.log("AN ERROR OCCURED");
		console.log(err.message);
		process.kill(process.pid, "SIGTERM");
	}
})();
