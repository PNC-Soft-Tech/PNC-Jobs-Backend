import { Request, Response, query } from "express";
import { GroupServices } from "./group.service";
import catchAsync from "../../../shared/catchAsync";
import Group from "./group.model";
import { IGroup, IGroupPhoto } from "./group.interface";
import { Schema } from "mongoose";
import AppError from "../../../error/AppError";

export const createGroup = catchAsync(async (req: Request, res: Response) => {
  const checkGroupName = await Group.find({ name: req.body.name });
  let data = req.body;
  if (!req.user) {
    throw new AppError(403, "You are not authenticated");
  }

  data = {
    ...data,
    owner: req.user._id as string,
  };

  // console.log(data);

  if (checkGroupName.length === 0) {
    const result = await GroupServices.createGroup(data);
    res.json({
      success: true,
      message: "Successfully Created Group",
      data: result,
    });
  } else {
    res.status(400).send({
      success: false,
      message: "Group name already exits !",
    });
  }
});

export const getAllGroup = async (req: Request, res: Response) => {
  const categories: IGroup[] = await GroupServices.getAllGroup(req); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getGroupById = catchAsync(async (req: Request, res: Response) => {
  const group = await GroupServices.getGroupById(req.params.id);
  if (!group) {
    res.status(404).json({
      success: false,
      message: "Group not found",
    });
  } else {
    res.json({
      success: true,
      data: group,
    });
  }
});

export const updateGroup = catchAsync(async (req: Request, res: Response) => {
  const result = await GroupServices.updateGroup(req.params.id, req.body);
  res.json({
    success: true,
    message: "Group updated successfully",
    data: result,
  });
});
export const addMemberToGroup = catchAsync(
  async (req: Request, res: Response) => {
    const result = await GroupServices.addMemberToGroup(
      req.params.id,
      req.body.user
    );
    res.json({
      success: true,
      message: "Member added to group successfully",
      data: result,
    });
  }
);

export const addPhotoToGroup = catchAsync(
  async (req: Request, res: Response) => {
    const { user, image } = req.body;
    const temp: IGroupPhoto = {
      user,
      image,
    };
    const result = await GroupServices.addPhotoToGroup(req.params.id, temp);
    res.json({
      success: true,
      message: "Photo added to group successfully",
      data: result,
    });
  }
);

export const deleteGroup = catchAsync(async (req: Request, res: Response) => {
  const result = await GroupServices.deleteGroup(req.params.id);
  res.json({
    success: true,
    message: "Group deleted successfully",
    data: result,
  });
});

export const PhotoController = {
  createGroup,
  getAllGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
  addMemberToGroup,
  addPhotoToGroup,
};
