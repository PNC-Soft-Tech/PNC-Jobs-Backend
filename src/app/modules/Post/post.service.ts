import { IPost } from "./post.interface";
import Post from "./post.model";

class PostService {
  public async createPost(data: IPost) {
    return await Post.create(data);
  }

  public async getAllPosts() {
    return await Post.find().populate("user");
  }

  public async getPostById(postId: string) {
    return await Post.findById(postId).populate("user");
  }

  public async updatePost(postId: string, data: Partial<IPost>) {
    return await Post.findByIdAndUpdate(postId, data, { new: true }).populate(
      "user"
    );
  }

  public async deletePost(postId: string) {
    return await Post.findByIdAndDelete(postId);
  }
}

export default new PostService();
