import { z } from "zod";
import { Types } from "mongoose";

// Custom validation for ObjectId
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

// Zod schema for IModel
export const createModelSchema = z.object({
  name: z.string().min(1, "Name is required"), // Ensures the name is a non-empty string
  description: z.string().min(1, "Description is required"), // Ensures the description is a non-empty string
  questions: z
    .array(objectIdSchema)
    .nonempty("At least one question is required"), // Ensures the array of ObjectIds is non-empty
});

// For updating a model, making fields optional
export const updateModelSchema = z.object({
  name: z.string().min(1, "Name is required").optional(), // Optional for updates
  description: z.string().min(1, "Description is required").optional(), // Optional for updates
  questions: z
    .array(objectIdSchema)
    .nonempty("At least one question is required")
    .optional(), // Optional for updates
});
