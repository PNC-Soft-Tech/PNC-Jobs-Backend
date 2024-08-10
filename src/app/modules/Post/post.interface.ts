import { Schema, Document } from "mongoose";

// Define the Post interface extending Mongoose Document
export interface IPost extends Document {
  title: string;
  description: string;
  class: string;
  subject: [];
  days: [];
  post_type: string;
  experience: number;
  salary: number;
  number_of_days_of_week: number;
  user: Schema.Types.ObjectId; // Assuming user is identified by a UUID string
}
