import mongoose from "mongoose";
import { IUser } from "../auth/auth.interface";

// category.interface.ts
export interface ICategory {
	name: string;
	slug: string;
}
