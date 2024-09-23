import { Schema, model, Types } from "mongoose";
import { IModel } from "./model.interface"; // Import the IModel interface

// Define the IModel schema
const modelSchema = new Schema<IModel>(
  {
    name: { type: String, required: true }, // Name of the model
    description: { type: String, required: true }, // Description of the model
    examType: { type: Types.ObjectId, ref: "ExamType", required: false }, // Description of the model
    questions: [
      { type: Schema.Types.ObjectId, ref: "Question", required: true },
    ], // Array of references to Question models
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the Model
const Model = model<IModel>("Model", modelSchema);

export default Model;
