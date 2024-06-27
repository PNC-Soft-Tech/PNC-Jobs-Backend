import express from "express";
import {
  createUnFavorite,
  getAllUnFavorite,
  getUnFavoriteById,
  updateUnFavorite,
  deleteUnFavorite,
} from "./unfavorite.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", createUnFavorite);
router.get("/", auth("user", "admin"), getAllUnFavorite);
router.get("/:id", getUnFavoriteById);
router.put("", auth("user", "admin"), updateUnFavorite);
router.delete("/:id", deleteUnFavorite);

export const unFavoriteRouter = router;
