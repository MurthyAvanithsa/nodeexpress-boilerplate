import { Request, Response, NextFunction } from "express";

import { logger } from "../logger/log";

export const errorLogger = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    if (err.name === "UnauthorizedError") {
      logger.error(`Unauthorized error: ${err.message}`);
      return res.status(401).json({ error: "Invalid or missing token" });
    }
    else if (err.errors) {
      logger.error(`Validation error: ${JSON.stringify(err.errors, null, 2)}`);
      return res.status(400).json({
        error: err.errors,
      });
    }
    else if (err.name == "PrismaClientInitializationError"){
      return res.status(500).json({ error: `Can't reach database server` });
    }
    else if (err.name == "PrismaClientKnownRequestError") {
      if (err.code == "P1000") {
        return res.status(500).json({ error: `Can't reach database server` });
      }
      if (err.code == "P2002") {
        return res.status(400).json({error: `${err.meta.target} already exists`})
      } else if(err.code == "P2025") {
        return res.status(404).json({error: `${err.meta.cause}`});
      }
    }
    return res.status(500).json({ error: err.meta ? err.meta.cause ? err.meta.cause: err : err.message ? err.message : err });
  }
  next();
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`${req.method} ${req.path}`);
  next();
};
