import Post from "../models/Post.js";
import fileService from "./FileService.js";

class PostService {
  async create(post, picture) {
    const fileName = fileService.saveFile(picture);
    const createdPost = await Post.create({ ...post, picture: fileName });
    return createdPost;
  }

  async getAll() {
    const posts = await Post.find();
    return posts;
  }

  async getOne(id) {
    if (!id) {
      throw new Error(`id not found or empty`);
    }
    const post = await Post.findById(id);
    return post;
  }

  async update(post) {
    if (!post._id) {
      throw new Error(`id not found or empty`);
    }
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }

  async delete(id) {
    if (!id) {
      throw new Error(`id not found or empty`);
    }
    const deletedPost = await Post.findByIdAndDelete(id, {
      new: true,
    });
    return deletedPost;
  }
}

export default new PostService();
