// category.model.ts
import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    banned_countries: [{ type: String }],
    image: { type: String, required: false },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = model<ICategory>("Category", categorySchema);
export default Category;
