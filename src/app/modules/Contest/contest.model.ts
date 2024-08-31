import { Schema, model, Types } from "mongoose";
import { IContest } from "./contest.interface"; // Import the IContest interface

// Define the IContest schema
const contestSchema = new Schema<IContest>(
  {
    name: { type: String, required: true }, // Name of the contest
    description: { type: String, required: true }, // Description of the contest
    questions: [{ type: Types.ObjectId, ref: "Question", required: true }], // Array of references to Question models
    startContest: { type: String, required: true }, // Start time of the contest
    endContest: { type: String, required: true }, // End time of the contest
    totalMarks: { type: Number, required: true }, // Total marks for the contest
    totalTime: { type: Number, required: true }, // Total time in minutes
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the Contest model
const Contest = model<IContest>("Contest", contestSchema);

export default Contest;
