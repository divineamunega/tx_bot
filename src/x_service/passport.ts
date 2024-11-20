import { configDotenv } from "dotenv";
import passport from "passport";
configDotenv({ path: ".env" });
import twitter from "passport-twitter";

const CONSUMER_KEY = process.env.X_API_KEY!;
const CONSUMER_SECRET = process.env.X_API_KEY_SECRET!;
const XStrategy = twitter.Strategy;

passport.use(
	new XStrategy(
		{
			consumerKey: CONSUMER_KEY,
			consumerSecret: CONSUMER_SECRET,
			callbackURL: "http://localhost:3000/auth/x-auth-callback",
		},
		async (token, tokenSecret, profile, cb) => {
			console.log("Token: ", token, "Token Secret: ", tokenSecret);
			console.log("profile: ", profile);
			throw new Error("Success");
		}
	)
);

export default passport;
