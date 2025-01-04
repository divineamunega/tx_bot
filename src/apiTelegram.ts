import { configDotenv } from "dotenv";
import delay from "./utils/delay";

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

const getUpdates = async function (offset?: number, retry = 3) {
	let numRetry = 0;
	while (numRetry < retry) {
		numRetry++;
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
		} catch (err: any) {
			if (numRetry <= retry) {
				await delay(3);
				console.log(`${err.message} Retried: ${numRetry}/${retry}`);
			}

			if (numRetry === retry) {
				console.log("COULD NOT FETCH TELEGRAM UPDATES!");
				throw new Error(err);
			}
		}
	}
};

const sendMessage = async function (
	message: string,
	chatId: number,
	parseMode = "HTML",
	retry = 3
) {
	let numRetry = 0;

	while (numRetry < retry) {
		numRetry++;
		try {
			const res = await fetch(`${BOTURL}/sendMessage`, {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					// text: message,
					chat_id: String(chatId),
					parse_mode: parseMode,
				}),
			});

			const data = await res.json();
			if (!data.ok) throw new Error(data);

			return data;
		} catch (err: any) {
			if (numRetry <= retry) {
				console.log(
					`SENDING OF TELEGRAM MESSAGES FAILED! ${numRetry}/${retry}`
				);
				await delay(3);
			}

			if (numRetry === retry) {
				console.log("COULD NOT SEND TELEGRAM MESSSAGES");
				throw new Error(err);
			}
		}
	}
};

export { sendMessage, getUpdates };
