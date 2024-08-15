import { Request } from "express";
import { IAnswer } from "./answer.interface";
import Answer from "./answer.model";

export const createAnswer = async (answer: IAnswer) => {
  const saveAnswer = await Answer.create(answer);
  return saveAnswer;
};
export const getAllAnswer = async (req: Request) => {
  const categories = await Answer.find();
  return categories;
};

export const getAnswerById = async (id: string) => {
  const answer = await Answer.findById(id);
  return answer;
};

export const updateAnswer = async (id: string, updatedAnswer: IAnswer) => {
  const updated = await Answer.findByIdAndUpdate(id, updatedAnswer, {
    new: true,
  });
  return updated;
};

export const deleteAnswer = async (id: string) => {
  const deleteAnswer = await Answer.findByIdAndRemove(id);
  return deleteAnswer;
};

export const AnswerServices = {
  createAnswer,
  getAllAnswer,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
};
