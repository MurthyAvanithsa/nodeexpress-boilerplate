import pino from 'pino';
import path from 'path';

const logFilePath = path.join(__dirname, 'app.log');

const prettyStream = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true, translateTime: true },
});

const fileStream = pino.destination({
  dest: logFilePath,
  sync: false,
});

export const logger = pino({
}, pino.multistream([
  { stream: prettyStream },
  { stream: fileStream }
]));
