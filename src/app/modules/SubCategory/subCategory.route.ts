import express from "express";
import {
  createSubCategory,
  getAllSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} from "./subCategory.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import {
  createSubCategorySchema,
  updateSubCategorySchema,
} from "./subCategory.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", zodValidator(createSubCategorySchema), createSubCategory);
router.get("/", getAllSubCategory);
router.get("/:id", getSubCategoryById);
router.put("/:id", zodValidator(updateSubCategorySchema), updateSubCategory);
router.delete("/:id", deleteSubCategory);

export const subCategoryRouter = router;
