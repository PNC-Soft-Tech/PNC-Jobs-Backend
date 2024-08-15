import { Request } from "express";
import { ISubCategory } from "./subCategory.interface";
import SubCategory from "./subCategory.model";

export const createSubCategory = async (subCategory: ISubCategory) => {
  const saveCategory = await SubCategory.create(subCategory);
  return saveCategory;
};
export const getAllSubCategory = async (req: Request) => {
  const subCategories = await SubCategory.find();
  return subCategories;
};

export const getSubCategoryById = async (id: string) => {
  const subCategory = await SubCategory.findById(id);
  return subCategory;
};

export const updateSubCategory = async (
  id: string,
  updatedSubCategory: ISubCategory
) => {
  const updated = await SubCategory.findByIdAndUpdate(id, updatedSubCategory, {
    new: true,
  });
  return updated;
};

export const deleteSubCategory = async (id: string) => {
  const deleteSubCategory = await SubCategory.findByIdAndRemove(id);
  return deleteSubCategory;
};

export const SubCategoryServices = {
  createSubCategory,
  getAllSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
