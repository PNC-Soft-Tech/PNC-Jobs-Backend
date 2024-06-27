import mongoose from "mongoose";
import { IUser } from "../auth/auth.interface";

export type IPhoto = {
  name: string;
  description: string;
  images?: string[];
  image: string;
  category: string;
  metaData: string[];
  type: string;
  status: "Pending" | "Accepted" | "Rejected";
  user: mongoose.Types.ObjectId | IUser;
  price: number;
  banned: [];
  creator: string;
  favourite: string[];
};
