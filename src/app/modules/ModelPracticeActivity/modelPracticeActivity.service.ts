import { Request } from "express";
import { IModelPracticeActivity } from "./modelPracticeActivity.interface";
import ModelPracticeActivity from "./modelPracticeActivity.model";

export const createModelPracticeActivity = async (
  modelPracticeActivity: IModelPracticeActivity
) => {
  const saveModelPracticeActivity = await ModelPracticeActivity.create(
    modelPracticeActivity
  );
  return saveModelPracticeActivity;
};
export const getAllModelPracticeActivity = async (req: Request) => {
  const categories = await ModelPracticeActivity.find();
  return categories;
};

export const getModelPracticeActivityById = async (id: string) => {
  const modelPracticeActivity = await ModelPracticeActivity.findById(id);
  return modelPracticeActivity;
};
export const checkTitleAndSlugExist = async (data: any) => {
  const modelPracticeActivity = await ModelPracticeActivity.findOne({
    $or: [{ title: data.title }, { slug: data.slug }],
  });
  return modelPracticeActivity;
};

export const updateModelPracticeActivity = async (
  id: string,
  updatedModelPracticeActivity: IModelPracticeActivity
) => {
  const updated = await ModelPracticeActivity.findByIdAndUpdate(
    id,
    updatedModelPracticeActivity,
    {
      new: true,
    }
  );
  return updated;
};

export const deleteModelPracticeActivity = async (id: string) => {
  const deleteModelPracticeActivity =
    await ModelPracticeActivity.findByIdAndRemove(id);
  return deleteModelPracticeActivity;
};

export const ModelPracticeActivityServices = {
  createModelPracticeActivity,
  getAllModelPracticeActivity,
  getModelPracticeActivityById,
  updateModelPracticeActivity,
  deleteModelPracticeActivity,
  checkTitleAndSlugExist,
};
