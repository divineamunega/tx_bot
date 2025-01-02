import { createClient } from "redis";

const startRedis = async function () {
	try {
		const client = await createClient()
			.on("error", (err) => {
				throw new Error("Redis Error");
			})
			.connect();

		return client;
	} catch (err) {
		console.log(err);
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

	console.log("Matching Keys with Values:", matchingKeys);
	return matchingKeys;
};

export { startRedis, searchRedis };
