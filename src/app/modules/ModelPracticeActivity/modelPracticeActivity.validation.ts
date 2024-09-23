import { z } from "zod";

// Zod schema for creating a new ModelPracticeActivity
export const createModelPracticeActivitySchema = z.object({
  model: z.string().min(1, "Model is required"), // Should match ObjectId, but string representation for validation
  startTime: z
    .string()
    .min(1, "Start time is required")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid start time format"), // Ensures valid date string
  endTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid end time format")
    .optional(), // Optional field
  totalMarks: z.number().default(0), // Default 0, negative values allowed
  marksObtained: z.number().default(0), // Default 0, negative values allowed
  correctCount: z.number().default(0), // Default 0, negative values allowed
  incorrectCount: z.number().default(0), // Default 0, negative values allowed
});

// Zod schema for updating ModelPracticeActivity
export const updateModelPracticeActivitySchema = z.object({
  model: z.string().min(1, "Model is required").optional(),
  startTime: z
    .string()
    .min(1, "Start time is required")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid start time format")
    .optional(), // Optional for updating
  endTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid end time format")
    .optional(),
  totalMarks: z.number().optional(), // Negative values allowed
  marksObtained: z.number().optional(), // Negative values allowed
  correctCount: z.number().optional(), // Negative values allowed
  incorrectCount: z.number().optional(), // Negative values allowed
});
