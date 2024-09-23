import { Schema, model, Types } from "mongoose";
import { IModelReadActivity } from "./modelReadActivity.interface";

// Define the IModelReadActivity schema
const modelReadActivitySchema = new Schema<IModelReadActivity>(
  {
    model: { type: Types.ObjectId, ref: "Model", required: true },
    startTime: { type: Date, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the ModelReadActivity model
const ModelReadActivity = model<IModelReadActivity>(
  "ModelReadActivity",
  modelReadActivitySchema
);

export default ModelReadActivity;
