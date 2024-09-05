import { Request } from "express";
import { IJobCategory } from "./jobCategory.interface";
import JobCategory from "./jobCategory.model";

export const createJobCategory = async (category: IJobCategory) => {
  const saveJobCategory = await JobCategory.create(category);
  return saveJobCategory;
};
export const getAllJobCategory = async (req: Request) => {
  const categories = await JobCategory.find();
  return categories;
};

export const getJobCategoryById = async (id: string) => {
  const category = await JobCategory.findById(id);
  return category;
};

export const updateJobCategory = async (
  id: string,
  updatedJobCategory: IJobCategory
) => {
  const updated = await JobCategory.findByIdAndUpdate(id, updatedJobCategory, {
    new: true,
  });
  return updated;
};

export const deleteJobCategory = async (id: string) => {
  const deleteJobCategory = await JobCategory.findByIdAndRemove(id);
  return deleteJobCategory;
};

export const JobCategoryServices = {
  createJobCategory,
  getAllJobCategory,
  getJobCategoryById,
  updateJobCategory,
  deleteJobCategory,
};
