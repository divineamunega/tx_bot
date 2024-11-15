import app from "./app";
import { configDotenv } from "dotenv";

configDotenv({ path: ".env" });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`X Microservice Server running on port ${PORT}`);
});
