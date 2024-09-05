// category.model.ts
import { Schema, model } from "mongoose";
import { IJobCircular } from "./jobCircular.interface";

const JobCircularSchema: Schema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  jobCategory: {
    type: Schema.Types.ObjectId,
    ref: "JobCategory",
    required: true,
  }, // Reference to JobCategory
  deadline: { type: Date, required: true }, // Use Date type
  link: { type: String },
});

const JobCircular = model<IJobCircular>("JobCircular", JobCircularSchema);
export default JobCircular;
