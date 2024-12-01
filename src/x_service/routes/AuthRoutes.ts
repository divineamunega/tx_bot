import { Router } from "express";
import { authenticateX } from "../controllers/AuthController";
import passport from "../passport";

const router = Router();

router.get("/x-auth-callback", authenticateX);
router.get(
	"/x",
	() => {
		/// Compare and search for the users telegram id in the database
		// If not there disallow
		// If there allow
	},
	passport.authenticate("twitter", { failureRedirect: "/x" })
);
export default router;
