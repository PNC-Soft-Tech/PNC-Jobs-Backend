import { z } from "zod";
import { Types } from "mongoose";

// Custom validation for ObjectId
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

// Create validation schema for a new subcategory
export const createSubCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  category: objectIdSchema, // Optional if it can be omitted, or remove `.optional()` if required
});

// Update validation schema for an existing subcategory
export const updateSubCategorySchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
  category: objectIdSchema.optional(),
});
