import { Request, Response, query } from "express";
import { CategoryServices } from "./category.service";
import catchAsync from "../../../shared/catchAsync";
import Category from "./category.model";
import { ICategory } from "./category.interface";

export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const checkCategoriesName = await Category.find({ name: req.body.name });
    if (checkCategoriesName.length == 0) {
      const result = await CategoryServices.createCategory(req.body);
      res.json({
        success: true,
        message: "Successfully Created Category",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Category name already exits !",
      });
    }
  }
);

export const getAllCategory = async (req: Request, res: Response) => {
  const categories: ICategory[] = await CategoryServices.getAllCategory(req); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const category = await CategoryServices.getCategoryById(req.params.id);
    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    } else {
      res.json({
        success: true,
        data: category,
      });
    }
  }
);

export const updateCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.updateCategory(
      req.params.id,
      req.body
    );
    res.json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  }
);

export const deleteCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.deleteCategory(req.params.id);
    res.json({
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  }
);

export const CategoryController = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
