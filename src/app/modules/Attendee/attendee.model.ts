import { Schema, model, Types } from "mongoose";
import { IAttendee } from "./attendee.interface";

// Define the IAttendee schema
const attendeeSchema = new Schema<IAttendee>(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true }, // References the Question model
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // References the User model
    contest: { type: Schema.Types.ObjectId, ref: "Contest", required: true }, // References a model (as ObjectId)
    selectedAnswer: { type: String, required: true }, // Stores the selected attendee
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create the Attendee model
const Attendee = model<IAttendee>("Attendee", attendeeSchema);

export default Attendee;
