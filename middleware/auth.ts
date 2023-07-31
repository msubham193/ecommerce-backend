import { NextFunction, Request, Response } from "express";
import { getCookie } from "../utils/cookieUtils";
import prisma from "../utils/prismaClient";
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
  }
}

exports.isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getCookie(req, "token");

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.SECRET_KEY);

  try {
    req.user = await prisma.user.findFirst({
      where: {
        email: decodedData.userEmail,
      },
    });

    console.log(req.user);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 404));
  }

  next();
};

exports.authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.name} is not allowed to access to Create Product `,
          403
        )
      );
    }
    next();
  };
};
