import express from "express";
import passport from "../utils/passport.js";
import { googleAuthCallback } from "../controllers/auth.controller.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleAuthCallback
);

export default router;
