import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../../error/AppError";
import { MongooseError } from "mongoose";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"; // Import JWT errors
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

  // console.error("Error Type:", err.constructor.name); // Log the constructor name
  // console.error("Error Details:", err); // Log the full error object

  // Handle custom application errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorResponse.message = message;

    if (!err.isOperational) {
      console.error("Unexpected Error:", err); // Log unexpected errors
    }

    // Handle Zod validation errors
  } else if (err instanceof ZodError) {
    statusCode = 400; // Bad Request for validation errors
    message = "Validation error";
    errorResponse.message = message;
    errorResponse.issues = err.issues.map((issue) => ({
      path: issue.path.join(" > "), // Join path to make it user-friendly
      message: `Invalid value for ${issue.path.join(" > ")}: ${issue.message}`,
      code: issue.code,
    }));

    // console.warn("Validation Error:", err); // Log validation errors

    // Handle Mongoose errors
  } else if (err instanceof MongooseError) {
    statusCode = 400; // Bad Request for Mongoose errors
    message = "Database error";
    errorResponse.message = message;
    errorResponse.details = err.message;

    // Handle MongoDB duplicate key error
    if ((err as any).code === 11000) {
      statusCode = 400; // Bad Request
      message = "Duplicate key error";
      const duplicateField = Object.keys((err as any).keyValue).join(", ");
      errorResponse.message = `Duplicate value for field: ${duplicateField}`;
    }
    // console.warn("Database Error:", err); // Log database errors

    // Handle JWT errors (authentication-related)
  } else if (err instanceof JsonWebTokenError) {
    statusCode = 401; // Unauthorized for JWT errors
    message = "Invalid token";
    errorResponse.message = message;

    console.warn("JWT Error:", err); // Log JWT errors
  } else if (err instanceof TokenExpiredError) {
    statusCode = 401; // Unauthorized for expired tokens
    message = "Token has expired";
    errorResponse.message = message;

    console.warn("JWT Expired Error:", err); // Log expired token errors

    // Handle unknown errors
  } else {
    console.error("Unknown Error:", err); // Log unknown errors
    errorResponse.message = message;
  }

  return res.status(statusCode).json(errorResponse);
};
