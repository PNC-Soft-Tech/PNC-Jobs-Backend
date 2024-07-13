import { Request, Response, NextFunction } from "express";
import catchAsync from "../../../shared/catchAsync";
import postService from "./post.service";
import AppError from "../../../error/AppError";

// Create a new post
export const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user?._id;
    const data = req.body;
    const post = await postService.createPost({ ...data, user });
    res.status(201).json({
      success: true,
      data: post,
    });
  }
);

// Get all posts
export const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await postService.getAllPosts();
    res.status(200).json({
      success: true,
      data: posts,
    });
  }
);

// Get a post by ID
export const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      throw new AppError(404, "Post not found");
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  }
);

// Update a post
export const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await postService.updatePost(req.params.id, req.body);
      if (!post) {
        throw new AppError(404, "Post not found");
      }
      res.status(200).json({
        success: true,
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete a post
export const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await postService.deletePost(req.params.id);
    if (!post) {
      throw new AppError(404, "Post not found");
    }
    res.status(204).json({
      success: true,
      message: "Post deleted successfully",
    });
  }
);
