import { Router } from "express";
import userRouter from "./users.routes.js";
import { accountsRouter } from "./accounts.routes.js";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/account", accountsRouter);

export default rootRouter;
