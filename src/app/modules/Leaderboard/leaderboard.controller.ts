import { Request, Response, query } from "express";
import { ContestServices } from "./leaderboard.service";
import catchAsync from "../../../shared/catchAsync";
import SubCategory from "../SubCategory/subCategory.model";
import Category from "../Category/category.model";
import Question from "../Question/question.model";
import Contest from "./leaderboard.model";
import { Types } from "mongoose";

export const getLeaderboardData = catchAsync(async (req: Request, res: Response) => {
  const result = await ContestServices.createContest(req.body);
  res.json({
    success: true,
    message: "Successfully Created Contest",
    data: result,
  });
});


export const PhotoController = {
  getLeaderboardData
};
