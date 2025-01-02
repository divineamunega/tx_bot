const randomTimes = function (number = 6) {
	const arr = [];

	const MINSINDAY = 1440;
	for (let i = 1; i <= number; i++) {
		arr.push(Math.floor(Math.random() * MINSINDAY + 1));
	}

	return arr;
};

export default randomTimes;
