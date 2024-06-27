import mongoose from "mongoose";
import { IUser } from "../auth/auth.interface";

// category.interface.ts
export interface ICategory {
	name: string;
	banned_countries: string[];
	image: string;
	user: mongoose.Types.ObjectId | IUser;
}
