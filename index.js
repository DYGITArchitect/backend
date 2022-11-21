import express from "express";
import mongoose from "mongoose";
import Post from "./Post.js";

const PORT = 5000;
const DB_URL =
  "mongodb+srv://test:123@cluster0.1njt7k2.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { author, title, content, picture } = req.body;
    const post = await Post.create({ author, title, content, picture });
    res.json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

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
