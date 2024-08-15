import express from "express";
import {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", zodValidator(createCategorySchema), createCategory);
router.get("/", getAllCategory);
router.get("/:id", getCategoryById);
router.put("/:id", zodValidator(updateCategorySchema), updateCategory);
router.delete("/:id", deleteCategory);

export const categoryRouter = router;
