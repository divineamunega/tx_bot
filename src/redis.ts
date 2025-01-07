import { createClient } from "redis";
import delay from "./utils/delay";

const startRedis = async function (retry = 3) {
	let numRetry = 0;

	while (numRetry < retry) {
		numRetry++;
		try {
			const client = await createClient({ url: process.env.REDIS_CLIENT_URL })
				.on("error", (err) => {
					throw new Error(err);
				})
				.connect();

			return client;
		} catch (err: any) {
			if (numRetry <= retry) {
				await delay(3);
				console.log(`${err.message} REDIS Retried: ${numRetry}/${retry}`);
			}

			if (numRetry === retry) {
				console.log("COULD NOT START REDIS");
				throw new Error(err);
			}
		}
	}
};

const searchRedis = async (client: any, match: string, filterValue: string) => {
	let cursor = 0;
	const matchingKeys = [];

	do {
		const { cursor: nextCursor, keys } = await client.scan(cursor, {
			MATCH: match,
		});
		cursor = nextCursor;

		for (const key of keys) {
			const value = await client.get(key);
			if (value === filterValue) {
				matchingKeys.push({ key, value });
			}
		}
	} while (cursor !== 0);

	return matchingKeys;
};

export { startRedis, searchRedis };
