import { Request } from "express";
import { IFavorite } from "./favorite.interface";
import Favorite from "./favorite.model";
import AppError from "../../../error/AppError";
import mongoose from "mongoose";
import UnFavorite from "../unfavorite/unfavorite.model";

export const createFavorite = async (favorite: IFavorite) => {
  const saveFavorite = await Favorite.create(favorite);
  return saveFavorite;
};
export const getAllFavorite = async (req: Request, user: any) => {
  const categories = await Favorite.find({
    user: new mongoose.Types.ObjectId(user as unknown as string),
  })
    .populate("user")
    .populate("photo");
  return categories;
};

export const getFavoriteById = async (id: string) => {
  const favorite = await Favorite.findById(id);
  return favorite;
};

export const updateFavorite = async (updatedFavorite: IFavorite) => {
  const { user, photo } = updatedFavorite;
  // Check if the user has already favorited the photo
  const existingFavorite = await Favorite.findOne({
    user: new mongoose.Types.ObjectId(user as unknown as string),
    photo: new mongoose.Types.ObjectId(photo as unknown as string),
  });

  const existInUnfavorite = await UnFavorite.findOne({
    user: new mongoose.Types.ObjectId(user as unknown as string),
    photo: new mongoose.Types.ObjectId(photo as unknown as string),
  });

  if (existInUnfavorite) {
    throw new AppError(400, "You have already unfavorited this photo");
  }

  if (existingFavorite) {
    // If the favorite exists, remove it
    const fav = await existingFavorite.deleteOne({
      user: new mongoose.Types.ObjectId(user as unknown as string),
      photo: new mongoose.Types.ObjectId(photo as unknown as string),
    });
    return fav;
  } else {
    // If the favorite does not exist, create it
    const newFavorite = new Favorite({ user, photo });
    await newFavorite.save();
    return newFavorite;
  }
};

export const deleteFavorite = async (id: string) => {
  const deleteFavorite = await Favorite.findByIdAndRemove(id);
  return deleteFavorite;
};

export const FavoriteServices = {
  createFavorite,
  getAllFavorite,
  getFavoriteById,
  updateFavorite,
  deleteFavorite,
};
