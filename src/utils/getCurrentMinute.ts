const getCurrentMinute = () =>
	new Date().getHours() * 60 + new Date().getMinutes();

export default getCurrentMinute;
