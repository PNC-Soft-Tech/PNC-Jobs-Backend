import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./app/middlewares/globalErrorHandler";
import AppError from "./error/AppError";
import { userRouter } from "./app/modules/auth/auth.route";
import { photoRouter } from "./app/modules/Photo/photo.route";
import { categoryRouter } from "./app/modules/Category/category.route";
import { favoriteRouter } from "./app/modules/favorite/favorite.route";
import { unFavoriteRouter } from "./app/modules/unfavorite/unfavorite.route";
import { groupRouter } from "./app/modules/group/group.route";
import { PaymentsRouter } from "./app/modules/Payment/payment.routes";
import { messageRouter } from "./app/modules/message/message.route";
import { chatsRouter } from "./app/modules/chat/chats.route";
import errorhandler from "errorhandler";
import config from "./config";

const app = express();

app.use(express.json());
app.use(cors());

if (config.node_env === "development") {
  app.use(morgan("dev"));
  app.use(errorhandler());
}

// Global error handler
app.use(errorHandler);

app.use(morgan("dev"));
app.use("/api/v1/photos", photoRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/favorites", favoriteRouter);
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/chats", chatsRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/unfavorites", unFavoriteRouter);
app.use("/api/v1/payments", PaymentsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome");
});
// Route not found (404 handler)
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(404, `Not Found - ${req.originalUrl}`);
  next(err);
});

export default app;
