import { Types } from "mongoose";

export interface IAnswer {
  question: Types.ObjectId; // Reference to a Question (as ObjectId)
  user: Types.ObjectId; // Reference to a User (as ObjectId)
  model: Types.ObjectId; // String representing the model (can be the name or type of the model)
  selectedAnswer: string; // The answer selected by the user
}
