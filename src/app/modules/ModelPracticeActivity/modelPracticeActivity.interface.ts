import { Types } from "mongoose";
import { IModel } from "../Model/model.interface";

export interface IModelPracticeActivity {
  model: Types.ObjectId | IModel;
  startTime: string | Date;
  endTime: string | Date;
  correctCount: number;
  incorrectCount: number;
  marksObtained: number;
  totalMarks: number;
}
