import { configDotenv } from "dotenv";

configDotenv({ path: ".env" });

const tgBotToken = process.env.TELEGRAM_BOT_TOKEN || "";

const BASE_URL = "https://api.telegram.org/bot";

type Updates = {
	updateId: string;
	message: object;
	date: number;
	text?: string;
};

const getUpdates = async function () {
	try {
		const res = await fetch(`${BASE_URL}${tgBotToken}/getUpdates`);
		if (!res.ok)
			throw new Error("An error occured while getting telegram updates.");

		const data = await res.json();

		if (!data.ok)
			throw new Error("An error occured while getting telegram updates");

		const updates: Updates[] = data.result;
		console.log(updates);
	} catch (err) {}
};

(async () => {
	while (true) {
		await getUpdates();
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
})();
