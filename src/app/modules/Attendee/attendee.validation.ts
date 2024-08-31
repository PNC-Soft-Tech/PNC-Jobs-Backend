import { z } from "zod";
import { Types } from "mongoose";

// Custom validation for ObjectId
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

// Zod schema for IAttendee
export const createAttendeeSchema = z.object({
  question: objectIdSchema, // Ensures valid ObjectId for question
  user: objectIdSchema, // Ensures valid ObjectId for user
  contest: objectIdSchema, // Ensures valid ObjectId for model
  selectedAnswer: z.string().min(1, "Selected answer is required"), // Ensures the selected answer is a non-empty string
});

// For updating an answer, we can make fields optional
export const updateAttendeeSchema = z.object({
  question: objectIdSchema.optional(),
  user: objectIdSchema.optional(),
  contest: objectIdSchema.optional(),
  selectedAttendee: z.string().min(1, "Selected answer is required").optional(),
});
