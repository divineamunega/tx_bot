import express from "express";
import AuthRoutes from "./routes/AuthRoutes";
import { configDotenv } from "dotenv";
configDotenv({ path: ".env" });
import session from "express-session";
import passport from "./passport";

const app = express();

app.use(
	session({
		secret: "some-secret-key",
		resave: false,
		saveUninitialized: true,
	})
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", AuthRoutes);
export default app;
