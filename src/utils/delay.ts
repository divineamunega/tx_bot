const delay = async function (seconds: number) {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export default delay;
