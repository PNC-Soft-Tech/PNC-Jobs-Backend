import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "./post.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import { postSchema, updatePostSchema } from "./post.validate";
import { auth } from "../../middlewares/auth";

const router = express.Router();

// Routes for Post operations
router.post("/", zodValidator(postSchema), auth("admin", "user"), createPost); // Create a new post
router.get("/", getAllPosts); // Get all posts
router.get("/:id", getPostById); // Get a single post by ID
router.put("/:id", zodValidator(updatePostSchema), updatePost); // Update a post
router.delete("/:id", deletePost); // Delete a post

export const postRouter = router;
