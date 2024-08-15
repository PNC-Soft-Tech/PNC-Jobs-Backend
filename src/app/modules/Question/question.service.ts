import { Request } from "express";
import { IQuestion } from "./question.interface";
import Question from "./question.model";

export const createQuestion = async (question: IQuestion) => {
  const saveQuestion = await Question.create(question);
  return saveQuestion;
};
export const getAllQuestion = async (req: Request) => {
  const categories = await Question.find();
  return categories;
};

export const getQuestionById = async (id: string) => {
  const question = await Question.findById(id);
  return question;
};

export const updateQuestion = async (
  id: string,
  updatedQuestion: IQuestion
) => {
  const updated = await Question.findByIdAndUpdate(id, updatedQuestion, {
    new: true,
  });
  return updated;
};

export const deleteQuestion = async (id: string) => {
  const deleteQuestion = await Question.findByIdAndRemove(id);
  return deleteQuestion;
};

export const QuestionServices = {
  createQuestion,
  getAllQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
