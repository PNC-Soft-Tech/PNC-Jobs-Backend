import express from "express";
import {
  createModel,
  getAllModel,
  getModelById,
  updateModel,
  deleteModel,
  getModelByName,
} from "./model.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import { createModelSchema, updateModelSchema } from "./model.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", zodValidator(createModelSchema), createModel);
router.get("/", getAllModel);
router.get("/name/:name", getModelByName);
router.get("/:id", getModelById);
router.put("/:id", zodValidator(updateModelSchema), updateModel);
router.delete("/:id", deleteModel);

export const modelRouter = router;
