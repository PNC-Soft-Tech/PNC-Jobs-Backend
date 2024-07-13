import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./auth.interface";

// Define the schema corresponding to the document interface.
const UserSchema: Schema<IUser> = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  fname: { type: String, required: false },
  lname: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false, unique: true },
  password: { type: String, required: true, minlength: 4 },
  authType: { type: String, required: false },
  otp: { type: String, required: false },
  isVerified: { type: Boolean, default: false },
  institute: { type: String, required: false },
  userType: {
    type: String,
    enum: ["tutor", "student"],
    required: false,
    default: "student",
  },
  userRole: {
    type: String,
    enum: ["user", "admin"],
    required: false,
    default: "user",
  },
  dob: { type: Date, required: false },
  dist: { type: String, required: false },
  upzilla: { type: String, required: false },
  div: { type: String, required: false },
  country: { type: String, default: "BD" },
  pro_pic: { type: String },
  about_me: { type: String },
});

// Pre-save hook to hash the password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Create a model.
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
