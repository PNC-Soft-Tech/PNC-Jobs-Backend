import { Schema, model, Types } from "mongoose";
import { IAnswer } from "./answer.interface";

// Define the IAnswer schema
const answerSchema = new Schema<IAnswer>(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true }, // References the Question model
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // References the User model
    model: { type: Schema.Types.ObjectId, ref: "Model", required: true }, // References a model (as ObjectId)
    selectedAnswer: { type: String, required: true }, // Stores the selected answer
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the Answer model
const Answer = model<IAnswer>("Answer", answerSchema);

export default Answer;
