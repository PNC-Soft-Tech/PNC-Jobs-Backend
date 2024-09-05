// category.model.ts
import { Schema, model } from "mongoose";
import { IJobCategory } from "./jobCategory.interface";

const categorySchema = new Schema<IJobCategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const JobCategory = model<IJobCategory>("JobCategory", categorySchema);
export default JobCategory;
