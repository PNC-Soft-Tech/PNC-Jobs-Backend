import { Router } from "express";
import { UserController } from "./auth.controller";

const router = Router();

router.post("/users", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export const userRouter = router;
