import express from "express";
import {
  createAttendee,
  getAllAttendee,
  getAttendeeById,
  updateAttendee,
  deleteAttendee,
} from "./attendee.controller";
import { zodValidator } from "../../middlewares/validationMiddleware";
import {
  createAttendeeSchema,
  updateAttendeeSchema,
} from "./attendee.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", zodValidator(createAttendeeSchema), createAttendee);
router.get("/", getAllAttendee);
router.get("/:id", getAttendeeById);
router.put("/:id", zodValidator(updateAttendeeSchema), updateAttendee);
router.delete("/:id", deleteAttendee);

export const attendeeRouter = router;
