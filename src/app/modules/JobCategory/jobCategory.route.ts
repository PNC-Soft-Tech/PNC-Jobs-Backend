import express from "express";
import {
  createJobCategory,
  getAllJobCategory,
  getJobCategoryById,
  updateJobCategory,
  deleteJobCategory,
} from "./jobCategory.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import {
  createJobCategorySchema,
  updateJobCategorySchema,
} from "./jobCategory.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", zodValidator(createJobCategorySchema), createJobCategory);
router.get("/", getAllJobCategory);
router.get("/:id", getJobCategoryById);
router.put("/:id", zodValidator(updateJobCategorySchema), updateJobCategory);
router.delete("/:id", deleteJobCategory);

export const jobCategoryRouter = router;
