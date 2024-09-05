// category.validation.ts
import { z } from "zod";

// Create validation schema for a new category
export const createJobCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
});

// Update validation schema for an existing category
export const updateJobCategorySchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
});
