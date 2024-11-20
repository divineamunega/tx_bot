import app from "./app";

const PORT = process.env.PORT || 2000;
console.log(PORT);

app.listen(PORT, () => {
	console.log(`X Microservice Server running on port ${PORT}`);
});
