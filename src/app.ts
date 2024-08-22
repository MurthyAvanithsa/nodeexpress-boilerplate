import express from 'express';
import { logger } from './logger/log';
import 'dotenv/config';
import feedRouter from './routes/feed.routes';
import filterRouter from './routes/filter.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app = express();
app.use(function (req, res, next) {
  logger.info(`${req.method}  ${req.path}`)
  return next();
})
app.use(feedRouter);
app.use(filterRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export function startServer(options: any) {
  app.listen(options.port, () => {
    logger.info(`Server is listening on port: ${options.port}`);
  });
}
