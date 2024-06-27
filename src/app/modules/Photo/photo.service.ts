import { Request } from "express";
import { IPhoto } from "./photo.interface";
import Photo from "./photo.model";
import mongoose from "mongoose";

export const createPhoto = async (photo: IPhoto) => {
  const savedPhoto = await Photo.create(photo);
  return savedPhoto;
};

export const getAllPhoto = async (req: Request) => {
  let searchTerm: string = "";
  let query = {};
  let type: string = "all";
  if (req.query?.type) {
    type = req.query.type as string;
  }

  if (req.query?.searchTerm) {
    searchTerm = req.query.searchTerm as string;
  }

  let limit: number = 10;
  if (req.query?.limit) {
    limit = +req.query?.limit;
  }

  let page: number = 1;
  if (req.query?.page) {
    page = +req.query?.page;
  }
  const skip: number = (page - 1) * limit;

  if (searchTerm) {
    query = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        {
          metaData: {
            $elemMatch: {
              $regex: searchTerm,
              $options: "i",
            },
          },
        },
      ],
    };
  }

  if (type && type !== "all") {
    query = {
      ...query,
      type: type,
    };
  }

  if (Object.keys(query).length > 0) {
    query = {
      $and: {
        ...query,
      },
    };
  }

  console.log(query);
  const photos = await Photo.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const size = await Photo.countDocuments();
  return {
    data: photos,
    page,
    limit,
    size,
  };
};

export const getAllPhotosByPostDataByAdmin = async (req: Request) => {
  const data = req.body;
  let categories: string[] = [];
  console.log("data~", data);
  let searchTerm: string = "";
  let query = {};
  let type: string = "all";
  if (data?.type) {
    type = data.type as string;
  }

  if (data?.searchTerm) {
    searchTerm = data.searchTerm as string;
  }
  if (data?.category) {
    categories = data?.category;
  }

  let limit: number = 16;
  if (req.query?.limit) {
    limit = +req.query?.limit;
  }

  let page: number = 1;
  if (req.query?.page) {
    page = +req.query?.page;
  }
  let skip: number = (page - 1) * limit;

  if (searchTerm) {
    query = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    };
  }

  if (type && type !== "all") {
    query = {
      ...query,
      type: type,
    };
  }

  if (Array.isArray(categories) && !categories.includes("all")) {
    query = {
      ...query,
      category: {
        $in: categories,
      },
    };
  } else {
    query = {
      ...query,
      category: {
        $ne: 'inbox-message',
      },
    };
  }

  if (Object.keys(query).length > 0) {
    query = {
      $and: [query],
    };
  }

  const size = await Photo.countDocuments(query);
  // if (skip >= size) {
  // 	skip = 0;
  // }
  console.log('photos query: ', query);
  const photos = await Photo.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    data: photos,
    page,
    limit,
    size,
  };
};

export const getAllPhotoByPostData = async (req: Request) => {
  const categories = req.body;
  let searchTerm: string = "";
  console.log("categories: ", categories);
  let query = {};
  let type: string = "all";
  if (req.query?.type) {
    type = req.query.type as string;
  }

  let status: string = "";
  if (req.query?.status) {
    status = req.query.status as string;
  }

  if (req.query?.searchTerm) {
    searchTerm = req.query.searchTerm as string;
  }

  let limit: number = 16;
  if (req.query?.limit) {
    limit = +req.query?.limit;
  }

  let page: number = 1;
  if (req.query?.page) {
    page = +req.query?.page;
  }
  let skip: number = (page - 1) * limit;

  if (searchTerm) {
    query = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    };
  }

  if (status) {
    query = {
      ...query,
      status: status,
    };
  }

  if (type && type !== "all") {
    query = {
      ...query,
      type: type,
    };
  }

  if (Array.isArray(categories) && !categories.includes("all")) {
    query = {
      ...query,
      category: {
        $in: categories,
      },
    };
  } else {
    query = {
      ...query,
      category: {
        $ne: 'inbox-message',
      },
    };
  }

  if (Object.keys(query).length > 0) {
    query = {
      $and: [query],
    };
  }

  console.log('query: ', query);
  const size = await Photo.countDocuments(query);
  // if (skip >= size) {
  // 	skip = 0;
  // }
  const photos = await Photo.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    data: photos,
    page,
    limit,
    size,
  };
};

const getPhotoById = async (id: string) => {
  const photo = await Photo.findById(id);
  return photo;
};

const updatePhoto = async (id: string, updatedPhoto: Partial<IPhoto>) => {
  const updated = await Photo.findByIdAndUpdate(id, updatedPhoto, {
    new: true,
  });
  return updated;
};
const changePhotoStatus = async (status: string, photoIds: string[]) => {
  // Update the status of multiple photos
  await Photo.updateMany({ _id: { $in: photoIds } }, { status: status });
  return null;
};

const deletePhoto = async (id: string) => {
  const deleted = await Photo.findByIdAndRemove(id);
  return deleted;
};

const toggleFavourite = async (photoId: any, userId: any) => {
  try {
    const photo = await Photo.findById({ _id: photoId });
    console.log("____________________>", photo);
    if (!photo) {
      throw new Error("Photo not found");
    }
    if (photo.favourite.includes(userId)) {
      // Remove user from the followers list of the photo
      userId = new mongoose.Types.ObjectId(userId);
      photo.favourite = photo.favourite.filter(
        (favouriteId) => favouriteId.toString() !== userId.toString()
      );
    } else {
      photo.favourite.push(userId);
    }

    await photo.save();
    return photo;
  } catch (error) {
    return error;
  }
};
const getFavouritePhotosByUser = async (userId: any) => {
  try {
    // Find photos where the user is in the followers list
    const userIdObjectId = new mongoose.Types.ObjectId(userId);
    const photos = await Photo.find({ favourite: userIdObjectId.toString() });
    return photos;
  } catch (error) {
    return error;
  }
};

export const PhotoServices = {
  createPhoto,
  getAllPhoto,
  getPhotoById,
  updatePhoto,
  deletePhoto,
  toggleFavourite,
  getFavouritePhotosByUser,
  getAllPhotoByPostData,
  getAllPhotosByPostDataByAdmin,
  changePhotoStatus,
};
