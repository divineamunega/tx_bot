import { Router } from "express";
import { authenticateX } from "../controllers/AuthController";
import passport from "../passport";

const router = Router();

router.get("/x-auth-callback", authenticateX);
router.get("/x", passport.authenticate("twitter", { failureRedirect: "/x" }));
export default router;
