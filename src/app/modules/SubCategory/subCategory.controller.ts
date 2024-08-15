import { Request, Response, query } from "express";
import catchAsync from "../../../shared/catchAsync";
import SubCategory from "./subCategory.model";
import { ISubCategory } from "./subCategory.interface";
import { SubCategoryServices } from "./subCategory.service";

export const createSubCategory = catchAsync(
  async (req: Request, res: Response) => {
    const checkCategoriesName = await SubCategory.find({ name: req.body.name });
    if (checkCategoriesName.length == 0) {
      const result = await SubCategoryServices.createSubCategory(req.body);
      res.json({
        success: true,
        message: "Successfully Created SubCategory",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "SubCategory name already exits !",
      });
    }
  }
);

export const getAllSubCategory = async (req: Request, res: Response) => {
  const subCategories: ISubCategory[] =
    await SubCategoryServices.getAllSubCategory(req); // Update variable name to 'subCategories'
  res.json({
    success: true,
    data: subCategories,
  });
};

export const getSubCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const SubCategory = await SubCategoryServices.getSubCategoryById(
      req.params.id
    );
    if (!SubCategory) {
      res.status(404).json({
        success: false,
        message: "SubCategory not found",
      });
    } else {
      res.json({
        success: true,
        data: SubCategory,
      });
    }
  }
);

export const updateSubCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SubCategoryServices.updateSubCategory(
      req.params.id,
      req.body
    );
    res.json({
      success: true,
      message: "SubCategory updated successfully",
      data: result,
    });
  }
);

export const deleteSubCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SubCategoryServices.deleteSubCategory(req.params.id);
    res.json({
      success: true,
      message: "SubCategory deleted successfully",
      data: result,
    });
  }
);

export const SubCategoryController = {
  createSubCategory,
  getAllSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
