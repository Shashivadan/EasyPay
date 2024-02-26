import { Router } from "express";
import {
  SignUp,
  SignIn,
  updateUser,
  bluk,
} from "../controllers/users.Controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", SignUp);

userRouter.post("/signin", SignIn);

userRouter.post("/", authMiddleware, updateUser);

userRouter.post("/bluk", authMiddleware, bluk);

export default userRouter;
