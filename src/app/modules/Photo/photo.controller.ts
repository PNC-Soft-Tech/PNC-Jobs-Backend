import { Request, Response, query } from "express";
import { PhotoServices } from "./photo.service";
import catchAsync from "../../../shared/catchAsync";
import Photo from "./photo.model";
import { IPhoto } from "./photo.interface";

export const createPhoto = catchAsync(async (req: Request, res: Response) => {
  const result = await PhotoServices.createPhoto(req.body as IPhoto);
  res.json({
    success: true,
    message: "photo Upload successfully",
    data: result,
  });
});

export const getAllPhotos = async (req: Request, res: Response) => {
  const products = await PhotoServices.getAllPhoto(req);
  res.json({
    success: true,
    ...products,
  });
};
export const getAllPhotosByPostData = async (req: Request, res: Response) => {
  const result = await PhotoServices.getAllPhotoByPostData(req);
  res.json({
    success: true,
    ...result,
  });
};
export const getAllPhotosByPostDataByAdmin = async (
  req: Request,
  res: Response
) => {
  const result = await PhotoServices.getAllPhotosByPostDataByAdmin(req);
  res.json({
    success: true,
    ...result,
  });
};

export const getPhotoById = catchAsync(async (req: Request, res: Response) => {
  const photo = await PhotoServices.getPhotoById(req.params.id);
  if (!photo) {
    res.status(404).json({
      success: false,
      message: "Photo not found",
    });
  } else {
    res.json({
      success: true,
      data: photo,
    });
  }
});

export const updatePhoto = catchAsync(async (req: Request, res: Response) => {
  req.body.editDate = new Date();
  const result = await PhotoServices.updatePhoto(req.params.id, req.body);
  res.json({
    success: true,
    message: "Photo updated successfully",
    data: result,
  });
});
export const changePhotoStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { status, photoIds } = req.body;
    const result = await PhotoServices.changePhotoStatus(status, photoIds);
    res.json({
      success: true,
      message: "Photo status updated successfully",
      data: result,
    });
  }
);

export const deletePhoto = catchAsync(async (req: Request, res: Response) => {
  const result = await PhotoServices.deletePhoto(req.params.id);
  res.json({
    success: true,
    message: "Photo deleted successfully",
    data: result,
  });
});
// export const addFollowerToPhoto = catchAsync(async (req: Request, res: Response) => {
// 	const {userId,photoId}=req.body;
// 	const result = await PhotoServices.addFollowerToPhoto(userId,photoId);
// 	res.json({
// 		success: true,
// 		message: "Add follower successfully",
// 		data: result,
// 	});
// });
export const toggleFavourite = catchAsync(
  async (req: Request, res: Response) => {
    const photoId = req.params.id;
    const userId = req.query.userId;
    if (!photoId || !userId) {
      res.status(404).json("Something went wrong");
    }
    const result = await PhotoServices.toggleFavourite(photoId, userId);
    res.json({
      success: true,
      message: "Toggle follower successfully",
      data: result,
    });
  }
);
export const getFavouritePhotosByUser = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PhotoServices.getFavouritePhotosByUser(req.params.id);
    res.json({
      success: true,
      message: "get all photo following by user",
      data: result,
    });
  }
);

export const PhotoController = {
  createPhoto,
  getAllPhotos,
  getPhotoById,
  updatePhoto,
  deletePhoto,
  getAllPhotosByPostDataByAdmin,
  getAllPhotosByPostData,
  toggleFavourite,
  getFavouritePhotosByUser,
  changePhotoStatus,
};
