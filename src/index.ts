import { configDotenv } from "dotenv";
import { getUpdates, sendMessage } from "./apiTelegram";

configDotenv({ path: ".env" });

(async () => {
	while (true) {
		const updates = await getUpdates();

		const startMessages = updates?.filter(
			(update) => update.message.text === "/start"
		);

		startMessages?.forEach(({ message }) => {
			const firstName = message.from.first_name;
			let botReply = `Holla ${firstName} Lock tf In!!!`;
			const chatId = message.chat.id;

			sendMessage(botReply, chatId);
		});

		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
})();
