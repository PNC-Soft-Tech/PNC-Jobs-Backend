import { Schema } from "mongoose";
import { IJobCategory } from "../JobCategory/jobCategory.interface";

export interface IJobCircular extends Document {
  title: string;
  company: string;
  jobCategory: Schema.Types.ObjectId | IJobCategory; // Reference to IJobCategory
  deadline: string | Date;
  link?: string;
}
