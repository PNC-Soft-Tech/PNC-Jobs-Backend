import express from "express";
import {
  createMessage,
  // getAllMessage,
  // getMessageById,
  // updateMessage,
  // deleteMessage,
  // getAllMessageByUser,
  getMessagesByChats,
} from "./message.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth("user"), createMessage);
router.get("/:id", auth("user"), getMessagesByChats);
// router.get("/", auth("admin", "user"), getAllMessage);

// router.delete("/:id", auth("user"), deleteMessage);
// router.get("/receiver-messages/:id", auth("user"), getAllMessageByUser);
// router.put("/:id", auth("user"), updateMessage);
// router.delete("/:id", auth("user"), deleteMessage);

export const messageRouter = router;
