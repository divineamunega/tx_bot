import delay from "./utils/delay";

const BASE_URL = "https://zenquotes.io/api/random/[your_key]";

const getQuote = async function (retry = 3) {
	let numRetry = 0;

	while (numRetry < retry) {
		numRetry++;
		try {
			const res = await fetch(BASE_URL);
			if (!res.ok)
				throw new Error("An Error occured while fetching the qoutes");

			const data = await res.json();
			return data[0];
		} catch (err: any) {
			if (numRetry <= retry) {
				console.log(`${err.message} ${numRetry}/${retry}`);
				await delay(3);
			}

			if (numRetry === retry) {
				console.log("COULD NOT GET QUOTES");
				throw new Error(err);
			}
		}
	}
};

export default getQuote;
