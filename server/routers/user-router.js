import { Router } from "express";
import userController from "../controllers/UserController.js";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth-middleware.js";

const userRouter = new Router();

userRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 16 }),
  userController.registration
);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/activate/:link", userController.activate);
userRouter.get("/refresh", userController.refresh);
userRouter.get("/users", authMiddleware, userController.getUsers);

export default userRouter;
