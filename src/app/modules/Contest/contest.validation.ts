import { z } from "zod";

// Validation schema for creating a contest
export const createContestSchema = z.object({
  name: z.string().min(1, "Name is required"), // Validate name is required
  description: z.string().min(1, "Description is required"), // Validate description is required
  questions: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"))
    .min(1, "At least one question is required"), // Validate array of ObjectIds and ensure at least one question
  startContest: z.date().refine((date) => date > new Date(), {
    message: "Start date must be in the future",
  }), // Validate that startContest is a future date
  endContest: z.date().refine((date) => date > new Date(), {
    message: "End date must be in the future",
  }), // Validate that endContest is a future date
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
  startContest: z
    .date()
    .refine((date) => date > new Date(), {
      message: "Start date must be in the future",
    })
    .optional(), // Optional future date validation
  endContest: z
    .date()
    .refine((date) => date > new Date(), {
      message: "End date must be in the future",
    })
    .optional(), // Optional future date validation
  totalMarks: z
    .number()
    .min(1, "Total marks must be a positive number")
    .optional(), // Optional positive number validation
  totalTime: z
    .number()
    .min(1, "Total time must be a positive number")
    .optional(), // Optional positive number validation
});
