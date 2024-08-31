import { Request, Response, query } from "express";
import { ContestServices } from "./contest.service";
import catchAsync from "../../../shared/catchAsync";
import { IContest } from "./contest.interface";

export const createContest = catchAsync(async (req: Request, res: Response) => {
  const result = await ContestServices.createContest(req.body);
  res.json({
    success: true,
    message: "Successfully Created Contest",
    data: result,
  });
});

export const getAllContest = catchAsync(async (req: Request, res: Response) => {
  const { categories, total, page, limit } =
    await ContestServices.getAllContest(req);

  res.json({
    success: true,
    data: categories,
    total, // Total number of items
    page, // Current page
    limit, // Items per page
    totalPages: Math.ceil(total / limit), // Total number of pages
  });
});

export const getContestById = catchAsync(
  async (req: Request, res: Response) => {
    const contest = await ContestServices.getContestById(req.params.id);
    if (!contest) {
      res.status(404).json({
        success: false,
        message: "Contest not found",
      });
    } else {
      res.json({
        success: true,
        data: contest,
      });
    }
  }
);
export const getContestByName = catchAsync(
  async (req: Request, res: Response) => {
    const contest = await ContestServices.getContestByName(req.params.name);
    if (!contest) {
      res.status(404).json({
        success: false,
        message: "Contest not found",
      });
    } else {
      res.json({
        success: true,
        data: contest,
      });
    }
  }
);

export const updateContest = catchAsync(async (req: Request, res: Response) => {
  const result = await ContestServices.updateContest(req.params.id, req.body);
  res.json({
    success: true,
    message: "Contest updated successfully",
    data: result,
  });
});

export const deleteContest = catchAsync(async (req: Request, res: Response) => {
  const result = await ContestServices.deleteContest(req.params.id);
  res.json({
    success: true,
    message: "Contest deleted successfully",
    data: result,
  });
});

export const PhotoController = {
  createContest,
  getAllContest,
  getContestById,
  updateContest,
  deleteContest,
};
