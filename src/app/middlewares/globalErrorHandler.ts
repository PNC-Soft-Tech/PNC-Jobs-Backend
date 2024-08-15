import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../../error/AppError";
import { MongooseError } from "mongoose";

// Define the global error handler
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorResponse: any = { success: false };

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorResponse.message = message;

    if (!err.isOperational) {
      console.error("Unexpected Error:", err); // Log unexpected errors
    }
  } else if (err instanceof ZodError) {
    // Handle Zod-specific errors
    statusCode = 400; // Bad Request for validation errors
    message = "Validation error";
    errorResponse.message = message;
    errorResponse.issues = err.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
      code: issue.code,
    }));

    console.warn("Validation Error:", err); // Log validation errors
  } else if (err instanceof MongooseError) {
    // Handle Mongoose-specific errors
    statusCode = 400; // Bad Request for Mongoose errors
    message = "Database error";
    errorResponse.message = message;
    errorResponse.details = err.message;

    console.warn("Database Error:", err); // Log database errors
  } else {
    console.error("Unknown Error:", err); // Log unknown errors
    errorResponse.message = message;
  }

  return res.status(statusCode).json(errorResponse);
};
