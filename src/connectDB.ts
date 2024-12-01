import mongoose from "mongoose";

const connectDB = async function () {
	try {
		await mongoose.connect("");
		console.log("MongoDb Connected 🎉");
	} catch (err) {
		console.log("Database Connection Error", err);
		process.exit(1); // Make this shut down gracefully
	}
};

export default connectDB;
