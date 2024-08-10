import { z } from "zod";
import { classes, postTypes } from "./post.constant";

// Define the Post schema
export const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  class: z
    .string()
    .min(1, { message: "Class is required" })
    .refine(
      (value) =>
        [
          "1st",
          "2nd",
          "3rd",
          "4th",
          "5th",
          "6th",
          "7th",
          "8th",
          "9th",
          "10th",
          "11th",
          "12th",
        ].includes(value),
      {
        message:
          "Class must be one of the following: 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th, 12th",
      }
    ),
  post_type: z
    .string()
    .refine((value) => postTypes.includes(value), {
      message: "Post type follows the following:tutor,tution",
    })
    .optional(),
  days: z.array(z.string()).optional(),
  subject: z.array(z.string()),
  experience: z
    .number()
    .min(0, { message: "Experience must be a non-negative number" }),
  salary: z
    .number()
    .min(0, { message: "Salary must be a non-negative number" }),
  number_of_days_of_week: z
    .number()
    .int()
    .min(1, { message: "Number of days of week must be at least 1" })
    .max(7, { message: "Number of days of week can be at most 7" }),
});

export type Post = z.infer<typeof postSchema>;

// Define the UpdatePost schema
export const updatePostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).optional(), // Optional field for the title
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .optional(), // Optional field for the description
  class: z
    .string()
    .min(1, { message: "Class is required" })
    .refine((value) => classes.includes(value), {
      message:
        "Class must be one of the following: 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th, 12th",
    })
    .optional(), // Optional field for the class
  subject: z.array(z.string()).optional(), // Optional field for the subject
  experience: z
    .number()
    .min(0, { message: "Experience must be a non-negative number" })
    .optional(), // Optional field for the experience
  salary: z
    .number()
    .min(0, { message: "Salary must be a non-negative number" })
    .optional(), // Optional field for the salary
  number_of_days_of_week: z
    .number()
    .int()
    .min(1, { message: "Number of days of week must be at least 1" })
    .max(7, { message: "Number of days of week can be at most 7" })
    .optional(), // Optional field for the number of days of the week

  post_type: z
    .string()
    .refine((value) => postTypes.includes(value), {
      message: "Post type follows the following:tutor,tution",
    })
    .optional(),
  days: z.array(z.string()).optional(),
});

export type UpdatePost = z.infer<typeof updatePostSchema>;
