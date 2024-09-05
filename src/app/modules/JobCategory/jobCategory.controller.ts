import { Request, Response, query } from "express";
import { JobCategoryServices } from "./jobCategory.service";
import catchAsync from "../../../shared/catchAsync";
import JobCategory from "./jobCategory.model";
import { IJobCategory } from "./jobCategory.interface";

export const createJobCategory = catchAsync(
  async (req: Request, res: Response) => {
    const checkCategoriesName = await JobCategory.find({ name: req.body.name });
    if (checkCategoriesName.length == 0) {
      const result = await JobCategoryServices.createJobCategory(req.body);
      res.json({
        success: true,
        message: "Successfully Created JobCategory",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "JobCategory name already exits !",
      });
    }
  }
);

export const getAllJobCategory = async (req: Request, res: Response) => {
  const categories: IJobCategory[] =
    await JobCategoryServices.getAllJobCategory(req); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getJobCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const category = await JobCategoryServices.getJobCategoryById(
      req.params.id
    );
    if (!category) {
      res.status(404).json({
        success: false,
        message: "JobCategory not found",
      });
    } else {
      res.json({
        success: true,
        data: category,
      });
    }
  }
);

export const updateJobCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await JobCategoryServices.updateJobCategory(
      req.params.id,
      req.body
    );
    res.json({
      success: true,
      message: "JobCategory updated successfully",
      data: result,
    });
  }
);

export const deleteJobCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await JobCategoryServices.deleteJobCategory(req.params.id);
    res.json({
      success: true,
      message: "JobCategory deleted successfully",
      data: result,
    });
  }
);

export const JobCategoryController = {
  createJobCategory,
  getAllJobCategory,
  getJobCategoryById,
  updateJobCategory,
  deleteJobCategory,
};
