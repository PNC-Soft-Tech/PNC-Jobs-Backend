import { Request } from "express";
import { IGroup, IGroupPhoto } from "./group.interface";
import Group from "./group.model";
import { Schema, Types } from "mongoose";
import AppError from "../../../error/AppError";

export const createGroup = async (group: IGroup) => {
  const saveGroup = await Group.create({
    ...group,
    members: [
      ...group.members,
      {
        user: group.owner,
      },
    ],
  });

  // saveGroup.members.unshift({
  //   user: owner,
  // });

  await saveGroup.save();
  return saveGroup;
};
export const getAllGroup = async (req: Request) => {
  const groups = await Group.find();

  return groups;
};

export const addPhotoToGroup = async (id: string, data: IGroupPhoto) => {
  const group = await Group.findById(id);

  if (!group) {
    throw new AppError(404, "Group not found");
  }

  group.photos.unshift(data);

  await group.save();
  return group;
};
export const addMemberToGroup = async (
  id: string,
  member: Schema.Types.ObjectId
) => {
  const group = await Group.findById(id);

  if (!group) {
    throw new AppError(404, "Group not found");
  }

  group.members.unshift({
    user: member,
  });

  await group.save();
  return group;
};

export const getGroupById = async (id: string) => {
  const group = await Group.findById(id);
  return group;
};

export const updateGroup = async (id: string, updatedGroup: IGroup) => {
  const updated = await Group.findByIdAndUpdate(id, updatedGroup, {
    new: true,
  });
  return updated;
};

export const deleteGroup = async (id: string) => {
  const deleteGroup = await Group.findByIdAndRemove(id);
  return deleteGroup;
};

export const GroupServices = {
  createGroup,
  getAllGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
  addMemberToGroup,
  addPhotoToGroup,
};
