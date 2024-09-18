import { Schema, model, Types } from "mongoose";
import { IExamType } from "./examType.interface";

// Define the IExamType schema
const examTypeSchema = new Schema<IExamType>(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the ExamType model
const ExamType = model<IExamType>("ExamType", examTypeSchema);

export default ExamType;
