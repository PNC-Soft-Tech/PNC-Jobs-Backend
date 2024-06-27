import { Request } from "express";
import { IUnFavorite } from "./unfavorite.interface";
import UnFavorite from "./unfavorite.model";
import mongoose from "mongoose";
import AppError from "../../../error/AppError";
import Favorite from "../favorite/favorite.model";

export const createUnFavorite = async (favorite: IUnFavorite) => {
  const saveUnFavorite = await UnFavorite.create(favorite);
  return saveUnFavorite;
};
export const getAllUnFavorite = async (user: any) => {
  const unFavorites = await UnFavorite.find({
    user: new mongoose.Types.ObjectId(user as unknown as string),
  })
    .populate("user")
    .populate("photo");
  return unFavorites;
};

export const getUnFavoriteById = async (id: string) => {
  const unfavorite = await UnFavorite.findById(id);
  return unfavorite;
};

export const updateUnFavorite = async (updatedUnFavorite: IUnFavorite) => {
  const { user, photo } = updatedUnFavorite;
  console.log("user", user, photo);
  // Check if the user has already unfavorited the photo
  const existingUnFavorite = await UnFavorite.findOne({
    user: new mongoose.Types.ObjectId(user as unknown as string),
    photo: new mongoose.Types.ObjectId(photo as unknown as string),
  });

  const existInfavorite = await Favorite.findOne({
    user: new mongoose.Types.ObjectId(user as unknown as string),
    photo: new mongoose.Types.ObjectId(photo as unknown as string),
  });

  console.log("existring-in-favorite~", existInfavorite);
  if (existInfavorite) {
    throw new AppError(400, "You have already favorited this photo");
  }

  if (existingUnFavorite) {
    // If the unfavorite exists, remove it
    const unfav = await existingUnFavorite.deleteOne({
      user: new mongoose.Types.ObjectId(user as unknown as string),
      photo: new mongoose.Types.ObjectId(photo as unknown as string),
    });
    return unfav;
  } else {
    // If the unfavorite does not exist, create it
    const newUnFavorite = new UnFavorite({ user, photo });
    await newUnFavorite.save();
    return newUnFavorite;
  }
};

export const deleteUnFavorite = async (id: string) => {
  const deleteUnFavorite = await UnFavorite.findByIdAndRemove(id);
  return deleteUnFavorite;
};

export const UnFavoriteServices = {
  createUnFavorite,
  getAllUnFavorite,
  getUnFavoriteById,
  updateUnFavorite,
  deleteUnFavorite,
};
