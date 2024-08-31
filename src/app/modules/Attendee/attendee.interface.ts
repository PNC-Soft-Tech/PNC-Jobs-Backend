import { Types } from "mongoose";

export interface IAttendee {
  question: Types.ObjectId; // Reference to a Question (as ObjectId)
  user: Types.ObjectId; // Reference to a User (as ObjectId)
  contest: Types.ObjectId; // String representing the model (can be the name or type of the model)
  selectedAnswer: string; // The answer selected by the user
}
