import path from 'path';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import * as OpenApiValidator from 'express-openapi-validator';

import { logger } from './logger/log';
import config from './config';
import { errorLogger, requestLogger } from './middleware/logger.middleware';
import { jwtMiddleware } from './middleware/jwt-authorization';
import bullBoardUI from './middleware/bull-board';
import { prismaConnection } from './connections';
import feedRouter from './routes/routes.feed';
import filterRouter from './routes/routes.filter';
import queueRouter from './routes/routes.queue';

export const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger/swagger.yaml'));
const openApiSpecPath = path.join(__dirname, 'swagger/swagger.yaml');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(requestLogger);

app.use(queueRouter);
app.use('/bull-board/ui', bullBoardUI);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use(jwtMiddleware);

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
  const server = app.listen(options.port, config.app.host, () => {
    logger.info(`Server is listening on port: ${options.port}`);
  });

  process.on('SIGTERM', async () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    server.close(async () => {
      logger.info('Server closed');
      if (prismaConnection) {
        try {
          await prismaConnection.$disconnect();
          logger.info('Prisma client disconnected');
        } catch (error) {
          logger.error(`Error disconnecting prisma client: ${error}`);
        }
      }
      process.exit(0);
    });
  });
}
