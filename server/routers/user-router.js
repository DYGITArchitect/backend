import { Router } from "express";
import userController from "../controllers/UserController.js";

const userRouter = new Router();

userRouter.post("/registration", userController.registration);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/activate/:link", userController.activate);
userRouter.get("/refresh", userController.refresh);
userRouter.get("/users", userController.getUsers);

export default userRouter;
