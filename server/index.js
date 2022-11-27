import express from "express"; // The main module to do REST API
import dotenv from "dotenv"; // The Module is used for load environmet variables from .env file loceted in root folder
import fs from "fs"; // The Module is used for work with file system operations
import path from "path"; // The Module is used for path working
import mongoose from "mongoose"; // The Module is used to work witn MongoDB
import Post from "./models/Post.js";
import postRouter from "./routers/post-router.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"; // The Module is used to upload file
import cors from "cors"; // The Module is used to response to different url or app
import swaggerUI from "swagger-ui-express"; // The Module is used for documatation and response on localhost:PORT/api-docs
import swaggerDoc from "./swagger/openapi.json" assert { type: "json" };
import morgan from "morgan"; // This is a log REST API
import userRouter from "./routers/user-router.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URL =
  "mongodb+srv://test:123@cluster0.1njt7k2.mongodb.net/?retryWrites=true&w=majority";

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(path.resolve(), "/logs/access.log"),
  {
    flags: "a",
  }
);

const app = express();
app.use(express.json());
app.use(morgan("common", { stream: accessLogStream }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("static"));
app.use(fileUpload({}));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use("/api", userRouter);
app.use("/api", postRouter);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log("Server was started on port " + PORT));
  } catch (error) {
    console.log(error);
  }
}

startApp();
