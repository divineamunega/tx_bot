const formatTimeFromMinute = function (minute: number) {
	return `${(Math.floor(minute / 60) + "").padStart(2, "0")}:${(
		(minute % 60) +
		""
	).padStart(2, "0")}`;
};

export default formatTimeFromMinute;
