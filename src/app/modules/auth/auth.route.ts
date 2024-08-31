import { Router } from "express";
import { UserController } from "./auth.controller";

const router = Router();

router.route("/login").post(UserController.loginUser);
router.route("/:id").get(UserController.getUserById).put(UserController.updateUser).delete(UserController.deleteUser);
router.route("/").get(UserController.getAllUsers).post(UserController.createUser);

export const userRouter = router;
