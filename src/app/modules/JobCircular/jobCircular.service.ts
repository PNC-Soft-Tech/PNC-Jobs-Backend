import { Request } from "express";
import { IJobCircular } from "./jobCircular.interface";
import JobCircular from "./jobCircular.model";

export const createJobCircular = async (jobCircular: IJobCircular) => {
  const saveJobCircular = await JobCircular.create(jobCircular);
  return saveJobCircular;
};
export const getAllJobCircular = async (req: Request) => {
  const categories = await JobCircular.find().populate("jobCategory");
  return categories;
};

export const getJobCircularById = async (id: string) => {
  const jobCircular = await JobCircular.findById(id).populate("jobCategory");
  return jobCircular;
};

export const updateJobCircular = async (
  id: string,
  updatedJobCircular: IJobCircular
) => {
  const updated = await JobCircular.findByIdAndUpdate(id, updatedJobCircular, {
    new: true,
  });
  return updated;
};

export const deleteJobCircular = async (id: string) => {
  const deleteJobCircular = await JobCircular.findByIdAndRemove(id);
  return deleteJobCircular;
};

export const JobCircularServices = {
  createJobCircular,
  getAllJobCircular,
  getJobCircularById,
  updateJobCircular,
  deleteJobCircular,
};
