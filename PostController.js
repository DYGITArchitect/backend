import Post from "./Post.js";
import PostService from "./PostService.js";

class PostController {
  async create(req, res) {
    try {
      const post = await PostService.create(req.body);
      res.json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostService.getAll();
      res.json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOne(req, res) {
    try {
      const post = await PostService.getOne(req.params.id);
      res.json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req, res) {
    try {
      const updatedPost = await PostService.update(req.body);
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const deletedPost = await PostService.delete(req.params.id);
      res.json(deletedPost);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new PostController();
