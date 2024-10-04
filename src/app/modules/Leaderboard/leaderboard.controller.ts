import { Request, Response, query } from "express";
import catchAsync from "../../../shared/catchAsync";

export const getLeaderboardData = catchAsync(async (req: Request, res: Response) => {
  // const result = await ContestServices.createContest(req.body);
  res.json({
    success: true,
    message: "Successfully Created Contest",
    data: "result",
  });
});


export const PhotoController = {
  getLeaderboardData
};
