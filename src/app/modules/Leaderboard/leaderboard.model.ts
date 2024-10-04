import { Schema, model } from "mongoose";
import { ILeaderboard } from "./leaderboard.interface";

// Define the leaderboard schema
const leaderboardSchema = new Schema<ILeaderboard>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  contest: { type: Schema.Types.ObjectId, ref: "Contest", required: true }, // Reference to Contest model
  totalMarksScored: { type: Number, required: true }, // Total marks scored by the user
  timeTaken: { type: Number, required: true }, // Time taken to complete the contest
  rank: { type: Number }, // Rank of the user in the contest (optional)
  accuracy: { type: Number }, // Accuracy in percentage (optional)
  submissionTime: { type: Date, required: true }, // Submission time of the contest
  bonusPoints: { type: Number }, // Bonus points (optional)
  streak: { type: Number }, // Winning streak (optional)
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the Leaderboard model
const Leaderboard = model<ILeaderboard>("Leaderboard", leaderboardSchema);

export default Leaderboard;
