import express from "express";
import {
  createExamType,
  getAllExamType,
  getExamTypeById,
  updateExamType,
  deleteExamType,
} from "./examType.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import {
  createExamTypeSchema,
  updateExamTypeSchema,
} from "./examType.validation";

const router = express.Router();

router.post("/", zodValidator(createExamTypeSchema), createExamType);
router.get("/", getAllExamType);
router.get("/:id", getExamTypeById);
router.put("/:id", zodValidator(updateExamTypeSchema), updateExamType);
router.delete("/:id", deleteExamType);

export const examTypeRouter = router;
