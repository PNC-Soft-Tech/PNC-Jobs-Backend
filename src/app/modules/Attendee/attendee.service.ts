import { Request } from "express";
import { IAttendee } from "./attendee.interface";
import Attendee from "./attendee.model";

export const createAttendee = async (attendee: IAttendee) => {
  const saveAttendee = await Attendee.create(attendee);
  return saveAttendee;
};
export const getAllAttendee = async (req: Request) => {
  const categories = await Attendee.find();
  return categories;
};

export const getAttendeeById = async (id: string) => {
  const attendee = await Attendee.findById(id);
  return attendee;
};

export const updateAttendee = async (
  id: string,
  updatedAttendee: IAttendee
) => {
  const updated = await Attendee.findByIdAndUpdate(id, updatedAttendee, {
    new: true,
  });
  return updated;
};

export const deleteAttendee = async (id: string) => {
  const deleteAttendee = await Attendee.findByIdAndRemove(id);
  return deleteAttendee;
};

export const AttendeeServices = {
  createAttendee,
  getAllAttendee,
  getAttendeeById,
  updateAttendee,
  deleteAttendee,
};
