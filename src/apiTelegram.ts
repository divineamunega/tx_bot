import { configDotenv } from "dotenv";
// a comment
// another comment

configDotenv({ path: ".env" });
const BASE_URL = "https://api.telegram.org/bot";
const tgBotToken = process.env.TELEGRAM_BOT_TOKEN || "";
const BOTURL = BASE_URL + tgBotToken;

type Message = { text: string; from: any; chat: any };

type Updates = {
	update_id: string;
	message: Message;
	date: number;
	text?: string;
};

const getUpdates = async function (offset?: number) {
	try {
		const res = await fetch(`${BOTURL}/getUpdates`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ offset }),
		});
		if (!res.ok)
			throw new Error("An error occured while getting telegram updates.");

		const data = await res.json();

		if (!data.ok)
			throw new Error("An error occured while getting telegram updates");

		const updates: Updates[] = data.result;
		return updates;
	} catch (err) {}
};

const sendMessage = async function (
	message: string,
	chatId: number,
	parseMode = "HTML"
) {
	try {
		const res = await fetch(`${BOTURL}/sendMessage`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				text: message,
				chat_id: String(chatId),
				parse_mode: parseMode,
			}),
		});

		// if (!res.ok) throw new Error("An error occured while sending the message");

		const data = await res.json();

		console.log(data);

		return data;
	} catch (err) {
		console.log("SENDING MESSAGE ERROR");
		console.log(err);
		throw err;
	}
};

export { sendMessage, getUpdates };
