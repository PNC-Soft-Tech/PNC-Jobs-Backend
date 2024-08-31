import { Types } from "mongoose";

export interface IContest {
  name: string; // Name of the quiz
  description: string; // Description of the quiz
  questions: Types.ObjectId[]; // Array of Question objects
  startContest: Date;
  endContest: Date;
  totalMarks: number;
  totalTime: number;
}
