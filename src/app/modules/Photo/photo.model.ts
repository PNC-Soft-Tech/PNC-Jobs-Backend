import mongoose, { Schema, model } from "mongoose";
import { IPhoto } from "./photo.interface";

const photoSchema = new Schema<IPhoto>(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: {
      type: String,
      required: true,
    },
    images: [{ type: String, required: false }],
    category: { type: String, required: true },
    type: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Accepted",
    },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, default: 0 },
    banned: Array,
    creator: {
      type: String,
      default: "",
    },
    metaData: [String],
    favourite: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Photo = model<IPhoto>("Photo", photoSchema);
export default Photo;
