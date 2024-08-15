import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./app/middlewares/globalErrorHandler";
import AppError from "./error/AppError";
import { userRouter } from "./app/modules/auth/auth.route";
import { categoryRouter } from "./app/modules/Category/category.route";
import errorhandler from "errorhandler";
import config from "./config";
import { subCategoryRouter } from "./app/modules/SubCategory/subCategory.route";
import { questionRouter } from "./app/modules/Question/question.route";
import { answerRouter } from "./app/modules/Answer/answer.route";
import { modelRouter } from "./app/modules/Model/model.route";

const app = express();

app.use(express.json());
app.use(cors());

if (config.node_env === "development") {
  app.use(morgan("dev"));
  app.use(errorhandler());
}

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/sub-categories", subCategoryRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/answers", answerRouter);
app.use("/api/v1/models", modelRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(AppError.notFound("This route does not exist."));
});

// Global error handler
app.use(errorHandler);
// Route not found (404 handler)

export default app;
