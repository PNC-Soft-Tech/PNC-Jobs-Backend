import { Types } from "mongoose";

export interface IModel {
  name: string; // Name of the quiz
  description: string; // Description of the quiz
  questions: Types.ObjectId[]; // Array of Question objects
}
