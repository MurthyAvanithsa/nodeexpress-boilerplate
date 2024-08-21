import express from 'express';
import { logger } from './logger/log';
import 'dotenv/config';
import feedRouter from './routes/feed.routes';
import filterRouter from './routes/filter.routes';

const app = express();
app.use(function (req, res, next) {
  logger.info(`${req.method}  ${req.path}`)
  return next();
})
app.use(feedRouter);
app.use(filterRouter)

export function startServer(options: any) {
  app.listen(options.port, () => {
    console.log(`Server is listening on port: ${options.port}`);
  });
}
