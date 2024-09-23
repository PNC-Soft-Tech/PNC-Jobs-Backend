import { z } from "zod";

// Zod schema for IAnswer
export const createModelReadActivitySchema = z.object({
  startTime: z.string().min(1, "startDate is required"),
  model: z.string().min(1, "model is required"), // Ensures the selected answer is a non-empty string
});

// For updating an answer, we can make fields optional
export const updateModelReadActivitySchema = z.object({
  startTime: z.string().min(1, "startDate is required").optional(),
  model: z.string().min(1, "model is required").optional(),
});
