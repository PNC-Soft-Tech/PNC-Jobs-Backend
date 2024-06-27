import { Document, Model, Types } from "mongoose";
export interface IUser extends Document {
  username: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password: string;
  authType: string;
  otp: string;
  isVerified: boolean;
  institute: string;
  userType: "tutor" | "student";
  dob: Date;
  dist: string;
  upzilla: string;
  div: string;
  country: string;
  pro_pic: string;
  about_me: string;
  userRole: string;
}

export type IUserMethods = {
  isUsersExistsWithEmail(id: string): Promise<Partial<IUser> | null>;
  isUsersExistsWithUserName(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type IUserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
