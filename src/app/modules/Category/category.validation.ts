// category.validation.ts
import { z } from "zod";

// Create validation schema for a new category
export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
});

// Update validation schema for an existing category
export const updateCategorySchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
});
