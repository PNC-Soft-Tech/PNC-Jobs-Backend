import express from "express";
import {
  createContest,
  getAllContest,
  getContestById,
  updateContest,
  deleteContest,
  getContestByName,
  generateContest,
} from "./contest.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import {
  createContestSchema,
  generateContestSchema,
  updateContestSchema,
} from "./contest.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", zodValidator(createContestSchema), createContest);
router.get("/", getAllContest);
router.post(
  "/generate-contest",
  zodValidator(generateContestSchema),
  generateContest
);
router.get("/name/:name", getContestByName);
router.get("/:id", getContestById);
router.put("/:id", zodValidator(updateContestSchema), updateContest);
router.delete("/:id", deleteContest);

export const contestRouter = router;
