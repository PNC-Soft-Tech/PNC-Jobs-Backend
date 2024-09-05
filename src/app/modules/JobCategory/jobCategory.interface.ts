import mongoose from "mongoose";
import { IUser } from "../auth/auth.interface";

// category.interface.ts
export interface IJobCategory {
  name: string;
  slug: string;
}
