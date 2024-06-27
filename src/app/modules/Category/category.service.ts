import { Request } from "express";
import { ICategory } from "./category.interface";
import Category from "./category.model";

export const createCategory= async (category:ICategory) => {
	const saveCategory = await Category.create(category);
	return saveCategory;
};
export const getAllCategory = async (req: Request) => {

	const categories = await Category.find();
	return categories;
};

export const getCategoryById = async (id: string) => {
	const category = await Category.findById(id);
	return category;
};

export const updateCategory = async (
	id: string,
	updatedCategory: ICategory
) => {
	const updated = await Category.findByIdAndUpdate(id, updatedCategory, {
		new: true,
	});
	return updated;
};

export const deleteCategory = async (id: string) => {
	const deleteCategory = await Category.findByIdAndRemove(id);
	return deleteCategory;
};



export const CategoryServices = {
	createCategory,
	getAllCategory,
	getCategoryById,
	updateCategory,
	deleteCategory
};
