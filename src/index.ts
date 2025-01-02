import { configDotenv } from "dotenv";
import { getUpdates, sendMessage } from "./apiTelegram";
import randomTimes from "./utils/randomTimes";
import { startRedis, searchRedis } from "./redis";

configDotenv({ path: ".env" });

const times = randomTimes(12);

const currentMinute = new Date().getHours() * 60 + new Date().getMinutes();

times;
currentMinute;
(async () => {
	const client = await startRedis();

	while (true) {
		const updates = await getUpdates();
		await client.set("hello", "hi");

		const startUpdates =
			updates?.filter((update) => update.message.text === "/start") || [];

		const filteredStartUpdates = [];
		for (const update of startUpdates) {
			const userId = update.message.from.id;
			if ((await client.get(userId + ":init")) !== "true") {
				await client.set(userId + ":init", "true");
				await client.set(userId + ":start", "false");
				filteredStartUpdates.push(update);
			}
		}

		console.log(startUpdates, "Length");
		const greetWelcome = await searchRedis(client, "*:start", "false");

		for (let i = 0; i < greetWelcome.length; i++) {}

		const update2 = await getUpdates();
		update2;
		sendMessage;

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
