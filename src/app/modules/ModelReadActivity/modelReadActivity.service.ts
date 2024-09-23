import { Request } from "express";
import { IModelReadActivity } from "./modelReadActivity.interface";
import ModelReadActivity from "./modelReadActivity.model";

export const createModelReadActivity = async (
  modelReadActivity: IModelReadActivity
) => {
  const saveModelReadActivity = await ModelReadActivity.create(
    modelReadActivity
  );
  return saveModelReadActivity;
};
export const getAllModelReadActivity = async (req: Request) => {
  const categories = await ModelReadActivity.find();
  return categories;
};

export const getModelReadActivityById = async (id: string) => {
  const modelReadActivity = await ModelReadActivity.findById(id);
  return modelReadActivity;
};
export const checkTitleAndSlugExist = async (data: any) => {
  const modelReadActivity = await ModelReadActivity.findOne({
    $or: [{ title: data.title }, { slug: data.slug }],
  });
  return modelReadActivity;
};

export const updateModelReadActivity = async (
  id: string,
  updatedModelReadActivity: IModelReadActivity
) => {
  const updated = await ModelReadActivity.findByIdAndUpdate(
    id,
    updatedModelReadActivity,
    {
      new: true,
    }
  );
  return updated;
};

export const deleteModelReadActivity = async (id: string) => {
  const deleteModelReadActivity = await ModelReadActivity.findByIdAndRemove(id);
  return deleteModelReadActivity;
};

export const ModelReadActivityServices = {
  createModelReadActivity,
  getAllModelReadActivity,
  getModelReadActivityById,
  updateModelReadActivity,
  deleteModelReadActivity,
  checkTitleAndSlugExist,
};
