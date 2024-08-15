import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import User from "./auth.model";
import { UserService } from "./auth.service";
import { IUser } from "./auth.interface";
import { jwtHelpers } from "../../../utils/auth";
import config from "../../../config";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const checkUserEmail = await User.find({ email: req.body.email }).lean();
    const checkUsername: any = await User.find({
      username: req.body.username,
    }).lean();

    if (checkUserEmail.length > 0) {
      return res.status(400).send({
        success: false,
        message: "Email already exists!",
      });
    }

    if (checkUsername.length > 0) {
      return res.status(400).send({
        success: false,
        message: "Username already exists!",
      });
    }

    const result = await UserService.createUser(req.body);
    const { password, ...others } = result.toObject();
    res.json({
      success: true,
      message: "Successfully created user",
      data: {
        user: others,
        token: jwtHelpers.createToken(
          {
            _id: result._id,
            userRole: result.userRole,
          },
          config.jwt_secret as string,
          {
            expiresIn: "30d",
          }
        ),
      },
    });
  }
);

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { password, identifier } = req.body;

  const { user, token } = await UserService.loginUser(identifier, password);

  res.json({
    success: true,
    message: "Login successful",
    data: {
      user,
      token,
    },
  });
});
export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users: IUser[] = await UserService.getUsers(req);
  res.json({
    success: true,
    data: users,
  });
});

export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.getUserById(req.params.id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  } else {
    res.json({
      success: true,
      data: user,
    });
  }
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(req.params.id, req.body);
  res.json({
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUser(req.params.id);
  res.json({
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
