import { searchRedis } from "../redis";
import { sendMessage } from "../apiTelegram";
import randomPhrase from "../utils/randomPhrases";
import formatTimeFromMinute from "../utils/formatTimeFromMinute";

type Message = { text: string; from: any; chat: any };

type Updates = {
	update_id: string;
	message: Message;
	date: number;
	text?: string;
};

const greetWelcome = async function (
	telegramUpdates: Updates[],
	redisClient: any,
	times: number[],
	currentMinute: number
) {
	const startUpdates =
		telegramUpdates?.filter((update) => update.message.text === "/start") || [];

	const filteredStartUpdates = [];
	for (const update of startUpdates) {
		const userId = update.message.from.id;
		let userName = update.message.from.username + "";

		if ((await redisClient.get(userId + ":init")) !== "true") {
			await redisClient.set(userId + ":init", "true");
			await redisClient.set(userId + `:${userName}` + ":start", "false");
			filteredStartUpdates.push(update);
		}
	}

	const greetWelcome = await searchRedis(redisClient, "*:start", "false");

	for (let i = 0; i < greetWelcome.length; i++) {
		if (greetWelcome[i].value === "true") continue;
		const [id, name] = greetWelcome[i].key.split(":");
		const nextMessageTime = times.find((time) => time > currentMinute);

		await sendMessage(
			`Holla ${name}. \n\n ${randomPhrase()} \n\n The people who change the world are those crazy enough to think that they can. <b>-Steve Jobs</b>`,
			id
		);

		await new Promise((resolve) => setTimeout(resolve, 5000));
		sendMessage(
			`I will remind you to lock in again by ${formatTimeFromMinute(
				nextMessageTime!
			)} \n <b>So you dont slack off again 💀 🫵</b>`,
			id,
			"HTML"
		);

		await redisClient.set(id + `:${name}` + ":start", "true");
	}
};

export default greetWelcome;
