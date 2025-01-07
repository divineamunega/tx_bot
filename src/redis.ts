import { createClient } from "redis";

const startRedis = async function () {
	try {
		const client = await createClient({ url: process.env.REDIS_CLIENT_URL })
			.on("error", (err) => {
				throw new Error(err);
			})
			.connect();

		return client;
	} catch (err: any) {
		console.log(err.message);
		throw new Error("REDIS ERROR");
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
