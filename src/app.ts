import path from 'path';
import fs from 'fs';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import * as yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';

import { logger } from './logger/log';
import config from './config';
import { errorLogger, requestLogger } from './middleware/logger.middleware';
import jwtAuthMiddleware from "./middleware/jwt-authorization";
import { redirectToAuthorizationUrl } from "./middleware/auth-middleware";
import { prismaConnection } from './connections';
import { registerRoute } from './utils/registerRoutes';

export const app = express();

const swaggerOptions = {
  customCss: "",
  customSiteTitle: "Microservices Boilerplate API Docs",
};
app.get("/authorize", redirectToAuthorizationUrl);

const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, "swagger/swagger.yaml"), 'utf8')) as Record<string, any>;
const openApiSpecPath = path.join(__dirname, "swagger/swagger.yaml");
const swaggerUiInstance = swaggerUi.setup(swaggerDocument, swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUiInstance);
app.use(cors());
bodyParserXml(bodyParser);
app.use(bodyParser.xml({
  limit: '1MB',
  xmlParseOptions: { explicitArray: false }
}));
app.use(express.text());
app.use(express.json());

app.use(requestLogger);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.get('/react-admin', (req, res) => {
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

let routePath: string = "public/routes";
const publicRouteDir = fs.readdirSync(`./src/${routePath}`);
const publicRouteFiles = publicRouteDir.filter(file => file.endsWith('.ts'));

publicRouteFiles.forEach(async file => {
  const routeName: string = path.basename(file, '.ts');
  const filePath = path.join(__dirname, `./public/routes/${routeName}`);
  const routeHandler = await registerRoute(filePath);
  if (routeHandler) {
    app.use(routeHandler);
  }
});

routePath = "routes";
const routeDir = fs.readdirSync(`./src/${routePath}`);
const routeFiles = routeDir.filter(file => file.endsWith('.ts'));

app.use(jwtAuthMiddleware);
routeFiles.forEach(async file => {
  const routeName: string = path.basename(file, '.ts');
  const filePath = path.join(__dirname, `./routes/${routeName}`);
  const routeHandler = await registerRoute(filePath);
  if (routeHandler) {
    app.use(routeHandler);
  }
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