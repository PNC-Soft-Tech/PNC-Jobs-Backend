import { Model, Schema } from "mongoose";
import { IUser } from "../auth/auth.interface";
import { IGroup } from "../group/group.interface";

export type IChatPhoto = {
  name?: string;
  image: string;
  user: Schema.Types.ObjectId | IUser;
};

export type IMemberUser = {
  user: Schema.Types.ObjectId | IUser;
};

export type IChat = {
  members: IMemberUser[];
  groupId: Schema.Types.ObjectId | IGroup;
  photo: IChatPhoto;
};
