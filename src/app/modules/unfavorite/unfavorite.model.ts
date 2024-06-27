// favorite.model.ts
import mongoose, { Schema, model } from "mongoose";
import { IUnFavorite } from "./unfavorite.interface";

const unFavoriteSchema = new Schema<IUnFavorite>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    photo: {
      type: Schema.Types.ObjectId,
      ref: "Photo",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UnFavorite = model<IUnFavorite>("UnFavorite", unFavoriteSchema);
export default UnFavorite;
