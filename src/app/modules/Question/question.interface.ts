import { Types } from "mongoose";

export interface IOption {
  title: string;
  order: string;
}

export interface IQuestion {
  title: string;
  options: IOption[]; // Array of strings for multiple choice options
  explanation: string;
  subCategory: Types.ObjectId; // Reference to a SubCategory (as ObjectId)
  rightAnswer: string; // Assuming it's a single correct answer
}
