import { Request } from "express";
import { IContest } from "./leaderboard.interface";
import Contest from "./leaderboard.model";

export const createContest = async (contest: IContest) => {
  const saveContest = await Contest.create(contest);
  return saveContest;
};
// export const getAllContest = async (req: Request) => {
//   const categories = await Contest.find();
//   return categories;
// };

export const getAllContest = async (req: Request) => {
  const { page = 1, limit = 10, name } = req.query;

  const query: any = {};

  // Apply filter based on the name (if provided)
  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive regex search
  }

  // Calculate the number of documents to skip
  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

  // Fetch the contests with pagination and query filter
  const categories = await Contest.find(query)
    .skip(skip)
    .limit(parseInt(limit as string));

  // Get the total count for pagination
  const total = await Contest.countDocuments(query);

  return {
    categories,
    total,
    page: parseInt(page as string),
    limit: parseInt(limit as string),
  };
};

export const getContestById = async (id: string) => {
  const contest = await Contest.findById(id)
    .populate({
      path: "questions",
      populate: {
        path: "subCategory",
        model: "SubCategory", // Use `model` instead of `contest`
        populate: {
          path: "category",
          model: "Category", // Use `model` instead of `contest`
        },
      },
    })
    .exec();

  return contest;
};
export const getContestByName = async (name: string) => {
  const contest = await Contest.findOne({ name })
    .populate({
      path: "questions",
      populate: {
        path: "subCategory",
        model: "SubCategory", // Use `model` instead of `contest`
        populate: {
          path: "category",
          model: "Category", // Use `model` instead of `contest`
        },
      },
    })
    .exec();

  return contest;
};

export const updateContest = async (id: string, updatedContest: IContest) => {
  const updated = await Contest.findByIdAndUpdate(id, updatedContest, {
    new: true,
  });
  return updated;
};

export const deleteContest = async (id: string) => {
  const deleteContest = await Contest.findByIdAndRemove(id);
  return deleteContest;
};

export const ContestServices = {
  createContest,
  getAllContest,
  getContestById,
  updateContest,
  deleteContest,
  getContestByName,
};
