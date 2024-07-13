import { Router } from "express";
import { UserController } from "./auth.controller";

const router = Router();

router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export const userRouter = router;
