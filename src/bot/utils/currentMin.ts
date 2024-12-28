const currentMin = function () {
	const minutes = new Date().getMinutes();
	const hours = new Date().getHours();

	const currentMinute = hours * 60 + minutes;

	return currentMinute;
};

export default currentMin;
