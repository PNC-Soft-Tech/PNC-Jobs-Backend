import express from "express";
import {
  createQuestion,
  getAllQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "./question.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import {
  createQuestionSchema,
  updateQuestionSchema,
} from "./question.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", zodValidator(createQuestionSchema), createQuestion);
router.get("/", getAllQuestion);
router.get("/:id", getQuestionById);
router.put("/:id", zodValidator(updateQuestionSchema), updateQuestion);
router.delete("/:id", deleteQuestion);

export const questionRouter = router;
