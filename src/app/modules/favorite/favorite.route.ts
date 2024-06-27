import express from "express";
import {
  createFavorite,
  getAllFavorite,
  getFavoriteById,
  updateFavorite,
  deleteFavorite,
} from "./favorite.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", createFavorite);
router.get("/", auth("user"), getAllFavorite);
router.get("/:id", getFavoriteById);
router.put("/", auth("user", "admin"), updateFavorite);
router.delete("/:id", deleteFavorite);

export const favoriteRouter = router;
