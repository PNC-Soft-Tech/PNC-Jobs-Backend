import bcrypt from "bcrypt";
import { Request } from "express";
import { IUser } from "./auth.interface";
import User from "./auth.model";
import { jwtHelpers } from "../../../utils/auth";
import config from "../../../config";
import AppError from "../../../error/AppError";

export class UserService {
  static async createUser(data: Partial<IUser>): Promise<IUser> {
    const user = new User(data);
    return await user.save();
  }

  static async getUsers(req: Request): Promise<IUser[]> {
    return await User.find();
  }

  static async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  static async updateUser(
    id: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }

  static async loginUser(identifier: string, password: string) {
    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).lean();

    if (!user) {
      // throw new AppError(400, "Invalid email/username or password");
      throw new Error("Invalid email/username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // throw new AppError(400, "Invalid email/username or password");
      throw new Error("Invalid email/username or password");
    }

    const token = jwtHelpers.createToken(
      {
        _id: user._id,
        userRole: user.userRole,
      },
      config.jwt_secret as string,
      {
        expiresIn: "30d",
      }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}
