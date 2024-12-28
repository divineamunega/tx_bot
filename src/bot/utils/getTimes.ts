const getTimes = function (iterations = 12) {
	const dayInMilli = 24 * 60;
	const times = [];

	for (let i = 0; i < iterations; i++) {
		times.push(Math.floor(Math.random() * (dayInMilli + 1)));
	}

	return times;
};

export default getTimes;
