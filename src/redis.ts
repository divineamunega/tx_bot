import { createClient } from "redis";

const startRedis = async function () {
	const client = await createClient()
		.on("error", (err) => {
			throw new Error("Redis Error");
		})
		.connect();

	await client.set("key", "value");
	const value = await client.get("key");
	console.log(value);
	await client.disconnect();
};

export default startRedis;
