import { Model, Schema } from "mongoose";
import { IUser } from "../auth/auth.interface";

export type IGroupPhoto = {
  name?: string;
  image: string;
  user: Schema.Types.ObjectId | IUser;
};

export type IMemberUser = {
  user: Schema.Types.ObjectId | IUser;
};

export type IGroup = {
  name: string;
  image?: string;
  owner: Schema.Types.ObjectId | IUser;
  members: IMemberUser[];
  photos: IGroupPhoto[];
};
