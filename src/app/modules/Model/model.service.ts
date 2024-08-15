import { Request } from "express";
import { IModel } from "./model.interface";
import Model from "./model.model";

export const createModel = async (model: IModel) => {
  const saveModel = await Model.create(model);
  return saveModel;
};
export const getAllModel = async (req: Request) => {
  const categories = await Model.find();
  return categories;
};

export const getModelById = async (id: string) => {
  const model = await Model.findById(id);
  return model;
};

export const updateModel = async (id: string, updatedModel: IModel) => {
  const updated = await Model.findByIdAndUpdate(id, updatedModel, {
    new: true,
  });
  return updated;
};

export const deleteModel = async (id: string) => {
  const deleteModel = await Model.findByIdAndRemove(id);
  return deleteModel;
};

export const ModelServices = {
  createModel,
  getAllModel,
  getModelById,
  updateModel,
  deleteModel,
};
