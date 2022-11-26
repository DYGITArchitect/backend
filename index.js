import express from "express";
import mongoose from "mongoose";
import Post from "./Post.js";
import router from "./router.js";
import fileUpload from "express-fileupload";
// import parseJson from "./parseJson.js";
// import cors from "cors";

const PORT = 5000;
const DB_URL =
  "mongodb+srv://test:123@cluster0.1njt7k2.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));
app.use("/api", router);
// app.use(cors());

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
