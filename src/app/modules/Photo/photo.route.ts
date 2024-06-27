import express from "express";
import {
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
} from "./photo.controller";

const router = express.Router();

router.route("/all/admin").post(getAllPhotosByPostDataByAdmin);
router.route("/favourite/:id").put(toggleFavourite);
router.route("/favourite_list/:id").get(getFavouritePhotosByUser);
router.route("/all").post(getAllPhotosByPostData);
router.route("/status").patch(changePhotoStatus);
router.route("/:id").get(getPhotoById).put(updatePhoto).delete(deletePhoto);
router.route("/").post(createPhoto).get(getAllPhotos);

export const photoRouter = router;
