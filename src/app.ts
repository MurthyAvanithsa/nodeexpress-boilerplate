import express, { NextFunction, Response, Request } from "express";
import { logger } from "./logger/log";
import "dotenv/config";
import feedRouter from "./routes/feed.routes";
import filterRouter from "./routes/filter.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import * as OpenApiValidator from "express-openapi-validator";
import bodyParser from 'body-parser';
import path from "path";
import { P } from "pino";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(function (req, res, next) {
  logger.info(`${req.method}  ${req.path}`);
  next();
});

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./swagger.json",
    validateRequests: true,
    validateResponses: true,
  })
);

app.use(feedRouter);
app.use(filterRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export function startServer(options: any) {
  app.listen(options.port, () => {
    logger.info(`Server is listening on port: ${options.port}`);
  });
}
