// category.validation.ts
import { z } from "zod";

export const createJobCircularSchema = z.object({
  title: z.string().min(1, "Title is required"), // Ensure title is a non-empty string
  company: z.string().min(1, "Company is required"), // Ensure company is a non-empty string
  jobCategory: z.string().min(1, "Job Category is required"), // Ensure jobCategory is a non-empty string (ObjectId)
  deadline: z.string().min(1, "Deadline is required"), // Deadline can be a string or Date
  link: z.string().optional(), // Link is an optional string
});

export const updateJobCircularSchema = z.object({
  title: z.string().min(1, "Title must be a non-empty string").optional(), // Optional but must be non-empty if provided
  company: z.string().min(1, "Company must be a non-empty string").optional(), // Optional but must be non-empty if provided
  jobCategory: z
    .string()
    .min(1, "Job Category must be a non-empty string")
    .optional(), // Optional but must be non-empty if provided
  deadline: z.string().min(1, "Deadline is required").optional(), // Optional field, can be a string or Date if provided
  link: z.string().optional(), // Optional field
});
