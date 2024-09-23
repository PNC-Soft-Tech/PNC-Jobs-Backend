import { Schema, model, Types } from "mongoose";
import { IModelPracticeActivity } from "./modelPracticeActivity.interface";

// Define the IModelPracticeActivity schema
const modelPracticeActivitySchema = new Schema<IModelPracticeActivity>(
  {
    model: { type: Types.ObjectId, ref: "Model", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: false },
    totalMarks: { type: Number, default: 0 },
    marksObtained: { type: Number, default: 0 },
    correctCount: { type: Number, default: 0 },
    incorrectCount: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the ModelPracticeActivity model
const ModelPracticeActivity = model<IModelPracticeActivity>(
  "ModelPracticeActivity",
  modelPracticeActivitySchema
);

export default ModelPracticeActivity;
