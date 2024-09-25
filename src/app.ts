import express from 'express';
import { Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
import swaggerUi from 'swagger-ui-express';

import { logger } from './logger/log';
import config from './config';
import { errorLogger, requestLogger } from './middleware/logger.middleware';
import jwtAuthMiddleware from "./middleware/jwtAuth.middleware";
import { redirectToAuthorizationUrl } from "./middleware/auth.middleware";
import { checkRolesAndPermissions } from './middleware/rbac.middleware';
import { openApiValidator } from './middleware/openApiValidator.middleware';
import bullBoardUI from './middleware/bullBoard.middleware';
import appRouter from "./utils/registerRoutes";
import { prismaConnection } from './connections';
import { swaggerUiInstance } from './utils/swaggerUiInstance';
export const app = express();

app.use(cors());
bodyParserXml(bodyParser);
app.use(bodyParser.xml({
  limit: '1MB',
  xmlParseOptions: { explicitArray: false }
}));
app.use(express.text());
app.use(express.json());

app.get("/authorize", redirectToAuthorizationUrl);
app.use("/api-docs", swaggerUi.serve, swaggerUiInstance); // Serving Swagger UI
app.use('/bull-board/ui', bullBoardUI); // Serving bull-board ui
app.get('/', (req: Request, res) => {
  res.redirect('/api-docs'); // Redirect to swagger UI
});

app.get('/queue-admin', (req, res) => {
  res.redirect(`http://localhost:5173`); // Redirect to queue admin
});


app.use(requestLogger);
app.use(openApiValidator);
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