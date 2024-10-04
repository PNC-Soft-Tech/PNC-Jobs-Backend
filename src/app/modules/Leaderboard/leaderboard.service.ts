import { Request } from "express";


export const getLeaderboard = async (req: Request) => {
  // const { page = 1, limit = 10, name } = req.query;

  // const query: any = {};

  // // Apply filter based on the name (if provided)
  // if (name) {
  //   query.name = { $regex: name, $options: "i" }; // Case-insensitive regex search
  // }

  // // Calculate the number of documents to skip
  // const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

  // // Fetch the contests with pagination and query filter
  // const categories = await Contest.find(query)
  //   .skip(skip)
  //   .limit(parseInt(limit as string));

  // // Get the total count for pagination
  // const total = await Contest.countDocuments(query);

  // return {
  //   categories,
  //   total,
  //   page: parseInt(page as string),
  //   limit: parseInt(limit as string),
  // };
};



export const ContestServices = {
  getLeaderboard
};
