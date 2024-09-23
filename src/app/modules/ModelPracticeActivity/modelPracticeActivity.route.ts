import express from "express";
import {
  createModelPracticeActivity,
  getAllModelPracticeActivity,
  getModelPracticeActivityById,
  updateModelPracticeActivity,
  deleteModelPracticeActivity,
} from "./modelPracticeActivity.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import {
  createModelPracticeActivitySchema,
  updateModelPracticeActivitySchema,
} from "./modelPracticeActivity.validation";

const router = express.Router();

router.post(
  "/",
  zodValidator(createModelPracticeActivitySchema),
  createModelPracticeActivity
);
router.get("/", getAllModelPracticeActivity);
router.get("/:id", getModelPracticeActivityById);
router.put(
  "/:id",
  zodValidator(updateModelPracticeActivitySchema),
  updateModelPracticeActivity
);
router.delete("/:id", deleteModelPracticeActivity);

export const modelPracticeActivityRouter = router;
