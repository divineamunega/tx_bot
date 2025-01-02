import { configDotenv } from "dotenv";
import { getUpdates, sendMessage } from "./apiTelegram";
import randomTimes from "./utils/randomTimes";

configDotenv({ path: ".env" });

const times = randomTimes(12);

const currentMinute = new Date().getHours() * 60 + new Date().getMinutes();

times;
currentMinute;
(async () => {
	while (true) {
		const updates = await getUpdates();
		console.log(updates);

		const startMessages = updates?.filter(
			(update) => update.message.text === "/start"
		);

		startMessages?.forEach(({ message }) => {
			const firstName = message.from.first_name;
			let botReply = `Holla ${firstName} Lock tf In!!!`;
			const chatId = message.chat.id;
			botReply;
			chatId;
			sendMessage;

			// sendMessage(botReply, chatId);
		});

		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
})();
