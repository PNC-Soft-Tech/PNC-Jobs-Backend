import { Schema } from "mongoose";
import { ICategory } from "../Category/category.interface";

// category.interface.ts
export interface ISubCategory {
  name: string;
  slug: string;
  category: Schema.Types.ObjectId | ICategory;
}
