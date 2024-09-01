import { Request, Response, query } from "express";
import { ContestServices } from "./contest.service";
import catchAsync from "../../../shared/catchAsync";
import { IContest } from "./contest.interface";
import SubCategory from "../SubCategory/subCategory.model";
import Category from "../Category/category.model";
import Question from "../Question/question.model";
import Contest from "./contest.model";

export const createContest = catchAsync(async (req: Request, res: Response) => {
  const result = await ContestServices.createContest(req.body);
  res.json({
    success: true,
    message: "Successfully Created Contest",
    data: result,
  });
});

export const generateContest = catchAsync(
  async (req: Request, res: Response) => {
    const {
      name,
      description,
      totalMarks = 60,
      totalTime = 60,
      categoryLimit = 5,
      subCategoryLimit = 5,
      questionLimit = 10,
    } = req.query;

    // Calculate start and end times (24 hours from now)
    const startContest = new Date();
    const endContest = new Date(startContest.getTime() + 24 * 60 * 60 * 1000); // 24 hours later

    // Fetch only one category
    const categories = await Category.aggregate([
      { $sample: { size: +categoryLimit } },
    ]).exec();

    if (!categories.length) {
      return res.status(404).json({ message: "No categories found." });
    }

    const selectedCategories = [];
    for (const category of categories) {
      selectedCategories.push(category._id);
    }

    let selectedSubCategories: any = [];

    // Fetch subcategories within the selected category
    for (const selectedCategory of selectedCategories) {
      const temp = await SubCategory.aggregate([
        { $match: { category: selectedCategory._id } },
        { $sample: { size: +subCategoryLimit } },
      ]).exec();

      selectedSubCategories = [...selectedSubCategories, ...temp];
    }

    if (selectedSubCategories.length === 0) {
      return res
        .status(404)
        .json({ message: "No subcategories found for the selected category." });
    }

    const selectedQuestions: any[] = [];

    for (const selectedCategory of selectedSubCategories) {
      // Fetch random questions from the subcategory
      const questions = await Question.aggregate([
        { $match: { subCategory: selectedCategory._id } },
        { $sample: { size: +questionLimit } },
      ]).exec();

      selectedQuestions.push(...questions);
    }

    // Construct the contest object
    const contest: any = {
      name,
      description,
      startContest: startContest.toISOString(),
      endContest: endContest.toISOString(),
      totalMarks,
      totalTime,
      questions: selectedQuestions.map((question) => question._id),
    };

    const saveModel = await Contest.create(contest);

    // Send the contest object as a response
    res.status(200).json({
      success: true,
      message: "Contest generated successfully",
      data: saveModel,
    });
  }
);

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
