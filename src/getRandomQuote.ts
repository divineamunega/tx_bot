const BASE_URL = "https://zenquotes.io/api/random/[your_key]";

const getQuote = async function () {
	try {
		const res = await fetch(BASE_URL);
		if (!res.ok) throw new Error("An Error occured while fetching the qoutes");

		const data = await res.json();
		return data[0];
	} catch (err: any) {
		console.log(err);
		throw new Error(err.message);
	}
};

export default getQuote;
