// favorite.model.ts
import mongoose, { Schema, model } from "mongoose";
import { IFavorite } from "./favorite.interface";

const favoriteSchema = new Schema<IFavorite>(
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

const Favorite = model<IFavorite>("Favorite", favoriteSchema);
export default Favorite;
