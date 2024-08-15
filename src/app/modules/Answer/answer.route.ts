import express from "express";
import {
  createAnswer,
  getAllAnswer,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
} from "./answer.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import { createAnswerSchema, updateAnswerSchema } from "./answer.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", zodValidator(createAnswerSchema), createAnswer);
router.get("/", getAllAnswer);
router.get("/:id", getAnswerById);
router.put("/:id", zodValidator(updateAnswerSchema), updateAnswer);
router.delete("/:id", deleteAnswer);

export const answerRouter = router;
