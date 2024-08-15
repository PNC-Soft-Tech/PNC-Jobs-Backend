// appError.ts
class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
  }

  static badRequest(message: string, isOperational = true) {
    return new AppError(message, 400, isOperational);
  }

  static unauthorized(message: string, isOperational = true) {
    return new AppError(message, 401, isOperational);
  }

  static forbidden(message: string, isOperational = true) {
    return new AppError(message, 403, isOperational);
  }

  static notFound(message: string, isOperational = true) {
    return new AppError(message, 404, isOperational);
  }

  static internalServerError(message: string, isOperational = true) {
    return new AppError(message, 500, isOperational);
  }

  static customError(
    message: string,
    statusCode: number,
    isOperational = true
  ) {
    return new AppError(message, statusCode, isOperational);
  }
}

export default AppError;
