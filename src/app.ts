import path from 'path';
import fs from 'fs';

import express from 'express';
import { Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import * as yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';

import { logger } from './logger/log';
import config from './config';
import { errorLogger, requestLogger } from './middleware/logger.middleware';
import jwtAuthMiddleware from "./middleware/jwtAuth.middleware";
import { redirectToAuthorizationUrl } from "./middleware/auth.middleware";
import { checkRolesAndPermissions } from './middleware/rbac.middleware';
import appRouter from "./utils/registerRoutes";
import { prismaConnection } from './connections';
export const app = express();

const swaggerOptions = {
  customCss: "",
  customSiteTitle: "Microservices Boilerplate API Docs",
};
const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, "swagger/swagger.yaml"), 'utf8')) as Record<string, any>;
const openApiSpecPath = path.join(__dirname, "swagger/swagger.yaml");
const swaggerUiInstance = swaggerUi.setup(swaggerDocument, swaggerOptions);

// cors to allow cross-origin
app.use(cors());
bodyParserXml(bodyParser);
// To parse xml data
app.use(bodyParser.xml({
  limit: '1MB',
  xmlParseOptions: { explicitArray: false }
}));
app.use(express.text());
app.use(express.json());

app.get("/authorize", redirectToAuthorizationUrl);
// Swagger ui
app.use("/api-docs", swaggerUi.serve, swaggerUiInstance);
app.use(requestLogger);

// Redirect to swagger ui
app.get('/', (req: Request, res) => {
  res.redirect('/api-docs');
});

app.get('/queue-admin', (req, res) => {
  res.redirect(`http://localhost:5173`);
});

app.use(
  OpenApiValidator.middleware({
    apiSpec: openApiSpecPath,
    validateRequests: true,
    validateResponses: true,
    ignorePaths: /.*\/job$/,
  })
);

app.use(jwtAuthMiddleware);
app.use(checkRolesAndPermissions);
app.use(appRouter);
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