import { Types } from "mongoose";
import { IModel } from "../Model/model.interface";

export interface IModelReadActivity {
  model: Types.ObjectId | IModel;
  startTime: string | Date;
}
