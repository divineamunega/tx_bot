import { configDotenv } from "dotenv";
import { getUpdates, sendMessage } from "./apiTelegram";
import randomTimes from "./utils/randomTimes";
import { startRedis, searchRedis } from "./redis";
import formatTimeFromMinute from "./utils/formatTimeFromMinute";
import getQuote from "./getRandomQuote";

configDotenv({ path: ".env" });

const times = randomTimes(12).sort((a, b) => a - b);
console.log(times);

times;
(async () => {
	const currentMinute = new Date().getHours() * 60 + new Date().getMinutes();
	const client = await startRedis();

	while (true) {
		const updates = await getUpdates();
		const allUsers = await searchRedis(client, "*:init", "true");

		const startUpdates =
			updates?.filter((update) => update.message.text === "/start") || [];

		const filteredStartUpdates = [];
		for (const update of startUpdates) {
			const userId = update.message.from.id;
			let userName = update.message.from.username + "";

			if ((await client.get(userId + ":init")) !== "true") {
				await client.set(userId + ":init", "true");
				await client.set(userId + `:${userName}` + ":start", "false");
				filteredStartUpdates.push(update);
			}
		}

		console.log(startUpdates, "Length");
		const greetWelcome = await searchRedis(client, "*:start", "false");

		for (let i = 0; i < greetWelcome.length; i++) {
			if (greetWelcome[i].value === "true") continue;
			const [id, name] = greetWelcome[i].key.split(":");
			const nextMessageTime = times.find((time) => time > currentMinute);

			await sendMessage(
				`Holla ${name}. Lock in \n \n The people who change the world are those crazy enough to think that they can. -Steve Jobs`,
				id
			);

			await new Promise((resolve) => setTimeout(resolve, 4000));
			sendMessage(
				`I will remind you to lock in again by ${formatTimeFromMinute(
					nextMessageTime!
				)} \n <b>So you dont slack off again 💀 🫵</b>`,
				id,
				"HTML"
			);

			await client.set(id + `:${name}` + ":start", "true");
		}

		for (let i = 0; i < times.length; i++) {
			if (currentMinute > times[i]) continue;

			if (currentMinute === times[i]) {
				// Perfect place to generate quote
				const { q, a } = await getQuote();
				const message = `${q} \n \m <b>${a}</b>`;

				for (let j = 0; j < allUsers.length; j++) {
					await sendMessage(message, allUsers[i].key.split(":")[0]);
				}
			}
		}

		// startMessages?.forEach(({ message }) => {
		// 	const firstName = message.from.first_name;
		// 	let botReply = `Holla ${firstName} Lock tf In!!!`;
		// 	const chatId = message.chat.id;
		// 	botReply;
		// 	chatId;
		// 	sendMessage;

		// 	// sendMessage(botReply, chatId);
		// });

		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
})();
