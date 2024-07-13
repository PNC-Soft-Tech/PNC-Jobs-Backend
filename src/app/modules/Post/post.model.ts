import mongoose, { Schema, Document } from "mongoose";
import { IPost } from "./post.interface";

// Define the Post schema
const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 1, // Ensure the title is not empty
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 1, // Ensure the description is not empty
    },
    class: {
      type: String,
      required: [true, "Class is required"],
      minlength: 1, // Ensure the class is not empty
      enum: [
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
      ],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: [0, "Experience must be a non-negative number"], // Ensure experience is non-negative
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary must be a non-negative number"], // Ensure salary is non-negative
    },
    number_of_days_of_week: {
      type: Number,
      required: [true, "Number of days of week is required"],
      min: [1, "Number of days of week must be at least 1"], // Ensure at least 1 day
      max: [7, "Number of days of week can be at most 7"], // Ensure at most 7 days
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Post model
const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
