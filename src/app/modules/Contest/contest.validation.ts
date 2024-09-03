import { z } from "zod";

// Validation schema for creating a contest
export const createContestSchema = z.object({
  name: z.string().min(1, "Name is required"), // Validate name is required
  description: z.string().min(1, "Description is required"), // Validate description is required
  questions: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"))
    .min(1, "At least one question is required"), // Validate array of ObjectIds and ensure at least one question
  startContest: z.string().min(1, "Start contest is required"), // Validate that startContest is a future date
  endContest: z.string().min(1, "End contest is required"), // Validate that endContest is a future date
  totalMarks: z.number().min(1, "Total marks must be a positive number"), // Validate positive number
  totalTime: z.number().min(1, "Total time must be a positive number"), // Validate positive number
});

// Validation schema for updating a contest
export const updateContestSchema = z.object({
  name: z.string().min(1, "Name is required").optional(), // Optional string validation
  description: z.string().min(1, "Description is required").optional(), // Optional string validation
  questions: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"))
    .min(1, "At least one question is required")
    .optional(), // Optional array of ObjectIds and ensure at least one question
  startContest: z.string().min(1, "Start contest is required").optional(), // Optional future date validation
  endContest: z.string().min(1, "End contest is required").optional(), // Optional future date validation
  totalMarks: z
    .number()
    .min(1, "Total marks must be a positive number")
    .optional(), // Optional positive number validation
  totalTime: z
    .number()
    .min(1, "Total time must be a positive number")
    .optional(), // Optional positive number validation
});

// Define the schema for the question parameters
const questionParamsSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "SubCategory is required"),
  no_of_ques: z.number().min(1, "Number of questions must be at least 1"),
});

export const generateContestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  startContest: z.string().min(1, "Start Contest is required"),
  endContest: z.string().min(1, "End Contest is required"),
  totalMarks: z.number().min(1, "Total marks must be at least 1"),
  totalQuestions: z.number().min(1, "Total questions must be at least 1"),
  totalTime: z.number().min(1, "Total time must be at least 1 minute"),
  questions: z
    .array(questionParamsSchema)
    .min(1, "At least one question parameter is required"),
});
