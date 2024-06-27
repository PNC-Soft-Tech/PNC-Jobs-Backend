import mongoose from "mongoose";
import { IUser } from "../auth/auth.interface";

// favorite.interface.ts
export interface IUnFavorite {
  user: mongoose.Types.ObjectId | IUser;
  photo: mongoose.Types.ObjectId | IUser;
}
