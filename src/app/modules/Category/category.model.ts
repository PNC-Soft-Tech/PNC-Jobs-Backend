// category.model.ts
import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Category = model<ICategory>("Category", categorySchema);
export default Category;
