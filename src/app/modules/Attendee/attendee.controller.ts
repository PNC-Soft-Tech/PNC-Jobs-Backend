import { Request, Response, query } from "express";
import { AttendeeServices } from "./attendee.service";
import catchAsync from "../../../shared/catchAsync";
import Attendee from "./attendee.model";
import { IAttendee } from "./attendee.interface";

export const createAttendee = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AttendeeServices.createAttendee(req.body);
    res.json({
      success: true,
      message: "Successfully Created Attendee",
      data: result,
    });
  }
);

export const getAllAttendee = async (req: Request, res: Response) => {
  const categories: IAttendee[] = await AttendeeServices.getAllAttendee(req); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getAttendeeById = catchAsync(
  async (req: Request, res: Response) => {
    const attendee = await AttendeeServices.getAttendeeById(req.params.id);
    if (!attendee) {
      res.status(404).json({
        success: false,
        message: "Attendee not found",
      });
    } else {
      res.json({
        success: true,
        data: attendee,
      });
    }
  }
);

export const updateAttendee = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AttendeeServices.updateAttendee(
      req.params.id,
      req.body
    );
    res.json({
      success: true,
      message: "Attendee updated successfully",
      data: result,
    });
  }
);

export const deleteAttendee = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AttendeeServices.deleteAttendee(req.params.id);
    res.json({
      success: true,
      message: "Attendee deleted successfully",
      data: result,
    });
  }
);

export const PhotoController = {
  createAttendee,
  getAllAttendee,
  getAttendeeById,
  updateAttendee,
  deleteAttendee,
};
