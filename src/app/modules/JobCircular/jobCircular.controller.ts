import { Request, Response, query } from "express";
import { JobCircularServices } from "./jobCircular.service";
import catchAsync from "../../../shared/catchAsync";
import JobCircular from "./jobCircular.model";
import { IJobCircular } from "./jobCircular.interface";

export const createJobCircular = catchAsync(
  async (req: Request, res: Response) => {
    let data = req.body;
    if (!data.deadline) {
      data.deadline = new Date(data.deadline);
    }

    const result = await JobCircularServices.createJobCircular(data);
    res.json({
      success: true,
      message: "Successfully Created JobCircular",
      data: result,
    });
  }
);

export const getAllJobCircular = async (req: Request, res: Response) => {
  const categories: IJobCircular[] =
    await JobCircularServices.getAllJobCircular(req); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getJobCircularById = catchAsync(
  async (req: Request, res: Response) => {
    const jobCircular = await JobCircularServices.getJobCircularById(
      req.params.id
    );
    if (!jobCircular) {
      res.status(404).json({
        success: false,
        message: "JobCircular not found",
      });
    } else {
      res.json({
        success: true,
        data: jobCircular,
      });
    }
  }
);

export const updateJobCircular = catchAsync(
  async (req: Request, res: Response) => {
    const result = await JobCircularServices.updateJobCircular(
      req.params.id,
      req.body
    );
    res.json({
      success: true,
      message: "JobCircular updated successfully",
      data: result,
    });
  }
);

export const deleteJobCircular = catchAsync(
  async (req: Request, res: Response) => {
    const result = await JobCircularServices.deleteJobCircular(req.params.id);
    res.json({
      success: true,
      message: "JobCircular deleted successfully",
      data: result,
    });
  }
);

export const JobCircularController = {
  createJobCircular,
  getAllJobCircular,
  getJobCircularById,
  updateJobCircular,
  deleteJobCircular,
};
