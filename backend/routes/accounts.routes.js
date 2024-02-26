import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { balance, transfer } from "../controllers/accounts.controller.js";

const accountsRouter = Router();

accountsRouter.get("/balance", authMiddleware, balance);

accountsRouter.post("/transfer", authMiddleware, transfer);

export { accountsRouter };
