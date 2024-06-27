import { Schema, model } from "mongoose";
import { IGroup, IGroupPhoto, IMemberUser } from "./group.interface";

const memberSchema = new Schema<IMemberUser>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const groupPhotoSchema = new Schema<IGroupPhoto>(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const GroupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
    members: [memberSchema],
    photos: [groupPhotoSchema],
  },
  {
    timestamps: true,
  }
);

const Group = model<IGroup>("Group", GroupSchema);

export default Group;
