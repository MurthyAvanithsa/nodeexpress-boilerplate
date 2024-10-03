import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import pinoHttp from "pino-http";

import { logger } from "../logger/log";

export const errorLogger = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  if (err) {
    if (err.name === "UnauthorizedError") {
      statusCode = 401;
      res.err = new Error("Invalid or missing token");
    } else if (err.errors) {
      statusCode = 400;
      res.err = new Error(err.errors);
    } else if (
      err.name == "PrismaClientInitializationError" ||
      err.code == "P1000"
    ) {
      res.err = new Error(`Can't reach database server ${err}`);
    } else if (err.code == "P2002") {
      statusCode = 409;
      res.err = new Error(`${err.meta.target} already exists`);
    } else if (err.code == "P2025" || err.code == "P2001") {
      statusCode = 404;
      res.err = new Error(`${err.meta.cause}`);
    } else {
      res.err = new Error(err.meta ? err.meta.cause ? err.meta.cause : err : err.message ? err.message : err);
    }
    res.status(statusCode).send({ error: res.err.message});
  }
  next();
};

export const requestLogger = pinoHttp({
  logger,
  genReqId: (req) => {
    return req.headers["x-request-id"] || uuidv4();
  },
  customLogLevel: (res) => {
    return ((res as any)?.res.statusCode ?? 304) >= 400 ? "error" : "info";
  },
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      query: req.query,
      headers: {
        host: req.headers.host,
        "user-agent": req.headers["user-agent"],
      },
    }),
  },
});
