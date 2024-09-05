import express from "express";
import {
  createJobCircular,
  getAllJobCircular,
  getJobCircularById,
  updateJobCircular,
  deleteJobCircular,
} from "./jobCircular.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import {
  createJobCircularSchema,
  updateJobCircularSchema,
} from "./jobCircular.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", zodValidator(createJobCircularSchema), createJobCircular);
router.get("/", getAllJobCircular);
router.get("/:id", getJobCircularById);
router.put("/:id", zodValidator(updateJobCircularSchema), updateJobCircular);
router.delete("/:id", deleteJobCircular);

export const jobCircularRouter = router;
