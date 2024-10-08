import { Types } from "mongoose";

export interface ILeaderboard {
  user: Types.ObjectId; // Reference to the User model
  contest: Types.ObjectId; // Reference to the Contest model
  totalMarksScored: number; // Total marks scored by the user
  timeTaken: number; // Time taken by the user in minutes
  rank?: number; // Rank of the user in the contest (can be calculated)
  accuracy?: number; // Accuracy of the user in percentage
  submissionTime: Date; // Time of submission
  bonusPoints?: number; // Any additional bonus points (optional)
  streak?: number; // User's winning streak across multiple contests (optional)
  createdAt?: Date; // Timestamp (automatically generated by Mongoose)
  updatedAt?: Date; // Timestamp (automatically generated by Mongoose)
}
