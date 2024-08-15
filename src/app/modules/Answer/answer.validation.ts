import { z } from "zod";
import { Types } from "mongoose";

// Custom validation for ObjectId
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

// Zod schema for IAnswer
export const createAnswerSchema = z.object({
  question: objectIdSchema, // Ensures valid ObjectId for question
  user: objectIdSchema, // Ensures valid ObjectId for user
  model: objectIdSchema, // Ensures valid ObjectId for model
  selectedAnswer: z.string().min(1, "Selected answer is required"), // Ensures the selected answer is a non-empty string
});

// For updating an answer, we can make fields optional
export const updateAnswerSchema = z.object({
  question: objectIdSchema.optional(),
  user: objectIdSchema.optional(),
  model: objectIdSchema.optional(),
  selectedAnswer: z.string().min(1, "Selected answer is required").optional(),
});
