import path from 'path';
import fs from 'fs';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';

import { logger } from './logger/log';
import config from './config';
import { errorLogger, requestLogger } from './middleware/logger.middleware';
import { jwtMiddleware } from './middleware/jwt-authorization';
import { prismaConnection } from './connections';

const files = fs.readdirSync('./src/routes/');
const routeFiles = files.filter(file => file.endsWith('.ts'));

export const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger/swagger.yaml'));
const openApiSpecPath = path.join(__dirname, 'swagger/swagger.yaml');

app.use(cors());
bodyParserXml(bodyParser);
app.use(bodyParser.xml({
  limit: '1MB',
  xmlParseOptions: { explicitArray: false }
}));
app.use(express.json()); 
app.use(express.text());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(requestLogger);

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

routeFiles.forEach(file => {
  const routeName = path.basename(file, '.ts');
  async function registerRoute() {
    try {
      const route = await import(`./routes/${routeName}`);
      if (route.default && typeof route.default === 'function') {
        app.use(route.default);
      }
    } catch (error) {
      logger.error(`Error registering route ${routeName}: ${error}`);
    }
  }
  registerRoute();
});

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
