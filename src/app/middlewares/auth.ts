import { NextFunction, Request, Response } from "express";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../utils/auth";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import User from "../modules/auth/auth.model";

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token: any =
        req.headers.authorization ||
        req.headers.Authorization ||
        req.headers.jwt;

      if (!token) {
        next(AppError.unauthorized("You are not authorized"));
      }
      // console.log('token found')
      if (token.includes("Bearer")) {
        // console.log("jwt token value=>>>>>>", token);
        token = token.split(" ")[1];
      }

      // verify token
      let verified = null;

      verified = jwtHelpers.verifyToken(token, config.jwt_secret as Secret);
      // console.log('verified: ', verified)
      const id = verified?._id;
      let verifiedUser: any = await User.findById({ _id: id });

      if (!verifiedUser) {
        // throw new AppError(404, "User Not Found");
        next(AppError.notFound("User Not Found"));
      }

      req.user = verifiedUser;

      if (
        requiredRoles.length &&
        !requiredRoles.includes(verifiedUser.userRole)
      ) {
        // console.log("verified-user", verifiedUser.userRole);
        // throw new AppError(httpStatus.FORBIDDEN, "Forbidden");
        next(AppError.forbidden("Forbidden"));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
