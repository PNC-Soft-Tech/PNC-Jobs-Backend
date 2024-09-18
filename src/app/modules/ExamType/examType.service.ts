import { Request } from "express";
import { IExamType } from "./examType.interface";
import ExamType from "./examType.model";

export const createExamType = async (examType: IExamType) => {
  const saveExamType = await ExamType.create(examType);
  return saveExamType;
};
export const getAllExamType = async (req: Request) => {
  const categories = await ExamType.find();
  return categories;
};

export const getExamTypeById = async (id: string) => {
  const examType = await ExamType.findById(id);
  return examType;
};
export const checkTitleAndSlugExist = async (data: any) => {
  const examType = await ExamType.findOne({
    $or: [{ title: data.title }, { slug: data.slug }],
  });
  return examType;
};

export const updateExamType = async (
  id: string,
  updatedExamType: IExamType
) => {
  const updated = await ExamType.findByIdAndUpdate(id, updatedExamType, {
    new: true,
  });
  return updated;
};

export const deleteExamType = async (id: string) => {
  const deleteExamType = await ExamType.findByIdAndRemove(id);
  return deleteExamType;
};

export const ExamTypeServices = {
  createExamType,
  getAllExamType,
  getExamTypeById,
  updateExamType,
  deleteExamType,
  checkTitleAndSlugExist,
};
