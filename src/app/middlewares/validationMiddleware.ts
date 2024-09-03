import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

// Define a generic middleware for Zod schema validation
export function zodValidator<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Parse request body (you can also validate query or params)
    const result = schema.safeParse(req.body);

    if (result.success) {
      // Attach the validated data to the request object
      req.body = result.data;
      next(); // Proceed to the next middleware or route handler
    } else {
      // Send a 400 Bad Request response with validation errors
      // res.status(400).json({
      //   error: "Validation failed",
      //   issues: result.error.issues,
      // });

      next(result.error);
    }
  };
}
