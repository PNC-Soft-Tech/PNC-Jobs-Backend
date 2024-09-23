import { Types } from "mongoose";
import { IExamType } from "../ExamType/examType.interface";

export interface IContest {
  name: string; // Name of the quiz
  description: string; // Description of the quiz
  questions: Types.ObjectId[]; // Array of Question objects
  startContest: string;
  endContest: string;
  totalMarks: number;
  totalTime: number;
  examType?: Types.ObjectId | IExamType;
}
