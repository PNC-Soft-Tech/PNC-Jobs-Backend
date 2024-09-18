import { z } from "zod";

// Zod schema for IAnswer
export const createExamTypeSchema = z.object({
  title: z.string().min(1, "title is required"),
  slug: z.string().min(1, "slug is required"), // Ensures the selected answer is a non-empty string
});

// For updating an answer, we can make fields optional
export const updateExamTypeSchema = z.object({
  title: z.string().min(1, "title is required").optional(),
  slug: z.string().min(1, "slug is required").optional(),
});
