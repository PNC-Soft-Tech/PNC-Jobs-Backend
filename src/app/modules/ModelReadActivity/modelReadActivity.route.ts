import express from "express";
import {
  createModelReadActivity,
  getAllModelReadActivity,
  getModelReadActivityById,
  updateModelReadActivity,
  deleteModelReadActivity,
} from "./modelReadActivity.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import {
  createModelReadActivitySchema,
  updateModelReadActivitySchema,
} from "./modelReadActivity.validation";

const router = express.Router();

router.post(
  "/",
  zodValidator(createModelReadActivitySchema),
  createModelReadActivity
);
router.get("/", getAllModelReadActivity);
router.get("/:id", getModelReadActivityById);
router.put(
  "/:id",
  zodValidator(updateModelReadActivitySchema),
  updateModelReadActivity
);
router.delete("/:id", deleteModelReadActivity);

export const modelReadActivityRouter = router;
