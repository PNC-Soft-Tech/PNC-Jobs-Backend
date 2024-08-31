import { Request } from "express";
import { IModel } from "./model.interface";
import Model from "./model.model";

export const createModel = async (model: IModel) => {
  const saveModel = await Model.create(model);
  return saveModel;
};
// export const getAllModel = async (req: Request) => {
//   const categories = await Model.find();
//   return categories;
// };

export const getAllModel = async (req: Request) => {
  const { page = 1, limit = 10, name } = req.query;

  const query: any = {};

  // Apply filter based on the name (if provided)
  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive regex search
  }

  // Calculate the number of documents to skip
  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

  // Fetch the models with pagination and query filter
  const categories = await Model.find(query)
    .skip(skip)
    .limit(parseInt(limit as string));

  // Get the total count for pagination
  const total = await Model.countDocuments(query);

  return {
    categories,
    total,
    page: parseInt(page as string),
    limit: parseInt(limit as string),
  };
};

export const getModelById = async (id: string) => {
  const model = await Model.findById(id)
    .populate({
      path: "questions",
      populate: {
        path: "subCategory",
        model: "SubCategory", // Ensure that the SubCategory model is correctly referenced
        populate: {
          path: "category",
          model: "Category",
        },
      },
    })
    .exec();

  return model;
};
export const getModelByName = async (name: string) => {
  const model = await Model.findOne({ name })
    .populate({
      path: "questions",
      populate: {
        path: "subCategory",
        model: "SubCategory", // Ensure that the SubCategory model is correctly referenced
        populate: {
          path: "category",
          model: "Category",
        },
      },
    })
    .exec();

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
  getModelByName,
};
