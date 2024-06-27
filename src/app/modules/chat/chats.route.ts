import express from "express";
import {
  createOrGetChat,
  getAllChats,
  // getAllGroup,
  // getGroupById,
  // updateGroup,
  // deleteGroup,
  // addMemberToGroup,
  // addPhotoToGroup,
} from "./chats.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

// router("/").post(auth("user"), (createChat)).get(auth("user"), (createChat));
router.route("/").all(auth("user")).post(createOrGetChat).get(getAllChats);
// router.get("/", auth("admin"), getAllGroup);
// router.patch("/add-member/:id", auth("user"), addMemberToGroup);
// router.patch("/add-photo/:id", auth("user"), addPhotoToGroup);
// router.get("/:id", auth("user"), getGroupById);
// router.put("/:id", auth("user"), updateGroup);
// router.delete("/:id", auth("user"), deleteGroup);

export const chatsRouter = router;
