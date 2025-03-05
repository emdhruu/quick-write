import { Router } from "express";
import authRoutes from "./auth.routes.js";

const mainRouter = Router();

mainRouter.get("/auth", authRoutes);

export { mainRouter };
