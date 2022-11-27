import { Router } from "express";
import PostController from "./PostController.js";
//import cors from "cors";

const router = new Router();

// router.post("/posts", cors(), PostController.create);
// router.get("/posts", cors(), PostController.getAll);
// router.get("/posts/:id", cors(), PostController.getOne);
// router.put("/posts", cors(), PostController.update);
// router.delete("/posts/:id", cors(), PostController.delete);

router.post("/posts", PostController.create);
router.get("/posts", PostController.getAll);
router.get("/posts/:id", PostController.getOne);
router.put("/posts", PostController.update);
router.delete("/posts/:id", PostController.delete);

export default router;
