// subCategory.model.ts
import { Schema, model } from "mongoose";
import { ISubCategory } from "./subCategory.interface";

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubCategory = model<ISubCategory>("SubCategory", subCategorySchema);
export default SubCategory;
