import { logger } from "../logger/log";
import { Request, Response, NextFunction } from "express";

export const errorLogger = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "UnauthorizedError") {
    logger.error(`Unauthorized error: ${err.message}`);
    return res.status(401).json({ message: "Invalid or missing token" });
  } else if (err.errors) {
    logger.error(`Validation error: ${JSON.stringify(err.errors, null, 2)}`);
    res.status(400).json({
      error: err.errors,
    });
  } else {
    logger.error(`Unexpected error: ${err.message}`);
    res.status(500).json({
      error: `An unexpected error occurred: ${err.message}`,
    });
  }
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`${req.method} ${req.path}`);
  next();
};
