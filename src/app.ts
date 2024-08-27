import express, { Request, Response, NextFunction } from 'express';
import { logger } from './logger/log';
import 'dotenv/config';
import feedRouter from './routes/routes.feed';
import filterRouter from './routes/routes.filter';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import bodyParser from 'body-parser'
import * as OpenApiValidator from 'express-openapi-validator';
import { errorLogger, requestLogger } from './middleware/logger.middleware';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger/swagger.yaml'));
const openApiSpecPath = path.join(__dirname, 'swagger/swagger.yaml');

app.use(express.json());
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  OpenApiValidator.middleware({
    apiSpec: openApiSpecPath,
    validateRequests: true,
    validateResponses: true
  })
);
app.use(feedRouter);
app.use(filterRouter);
app.use(errorLogger);

export function startServer(options: { port: number }) {
  app.listen(options.port, () => {
    logger.info(`Server is listening on port: ${options.port}`);
  });
}
