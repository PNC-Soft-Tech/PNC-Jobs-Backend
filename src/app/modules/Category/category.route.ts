import express from "express";
import { 	createCategory,
	getAllCategory,
	getCategoryById,
	updateCategory,
	deleteCategory } from "./category.controller";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategory );
router.get("/:id",getCategoryById );
router.put("/:id",updateCategory );
router.delete("/:id",deleteCategory);

export const categoryRouter = router;
