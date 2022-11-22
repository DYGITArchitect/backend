import express from "express";
import mongoose from "mongoose";
import Post from "./Post.js";
import router from "./router.js";

const PORT = 5000;
const DB_URL =
  "mongodb+srv://test:123@cluster0.1njt7k2.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use("/api", router);

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