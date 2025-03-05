import express from "express";
import { saveDraft } from "../controllers/save.controller.js";
import passport from "passport";

const router = express.Router();

router.post(
  "/save",
  passport.authenticate("google", { session: false }),
  saveDraft
);

export default router;
