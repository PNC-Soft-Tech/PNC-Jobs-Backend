import { Schema, model, Types } from "mongoose";
import { IQuestion, IOption } from "./question.interface";

// Define the IOption schema
const optionSchema = new Schema<IOption>({
  title: { type: String, required: true },
  order: { type: String, required: true },
});

// Define the IQuestion schema
const questionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    options: { type: [optionSchema], required: true }, // Embeds the IOption schema
    explanation: { type: String, required: true },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    rightAnswer: { type: String, required: true }, // Assuming a single correct answer
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the Question model
const Question = model<IQuestion>("Question", questionSchema);

export default Question;
