import { z } from "zod";
import { Types } from "mongoose";

// Custom validation for ObjectId
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

// Zod schema for IOption
const optionSchema = z.object({
  title: z.string().min(1, "Option title is required"),
  order: z.string().min(1, "Option order is required"),
});

// Zod schema for IQuestion
export const createQuestionSchema = z.object({
  title: z.string().min(1, "Question title is required"),
  options: z.array(optionSchema).min(1, "At least one option is required"),
  explanation: z.string().min(1, "Explanation is required"),
  subCategory: objectIdSchema, // Ensures valid ObjectId
  rightAnswer: z.string().min(1, "Right answer is required"),
});

// For updating a question, we make all fields optional
export const updateQuestionSchema = z.object({
  title: z.string().min(1, "Question title is required").optional(),
  options: z
    .array(optionSchema)
    .min(1, "At least one option is required")
    .optional(),
  explanation: z.string().min(1, "Explanation is required").optional(),
  subCategory: objectIdSchema.optional(),
  rightAnswer: z.string().min(1, "Right answer is required").optional(),
});
