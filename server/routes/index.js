import { Router } from "express";
import authRoutes from "./auth.routes.js";
import saveRoutes from "./save.routes.js";

const mainRouter = Router();

mainRouter.get("/auth", authRoutes);
mainRouter.post("/document", saveRoutes);

export { mainRouter };
