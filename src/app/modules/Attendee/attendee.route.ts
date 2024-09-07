import express from "express";
import {
  createAttendee,
  getAllAttendee,
  getAttendeeById,
  updateAttendee,
  deleteAttendee,
  checkAttendee,
} from "./attendee.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import {
  createAttendeeSchema,
  updateAttendeeSchema,
} from "./attendee.validation";

const router = express.Router();

router.post("/", zodValidator(createAttendeeSchema), createAttendee);
router.get("/", getAllAttendee);
router.get("/check/:userId/:questionId/:contestId", checkAttendee);
router.get("/:id", getAttendeeById);
router.put("/:id", zodValidator(updateAttendeeSchema), updateAttendee);
router.delete("/:id", deleteAttendee);

export const attendeeRouter = router;
