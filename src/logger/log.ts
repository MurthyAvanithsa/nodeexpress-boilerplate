import pino from 'pino';
import path from 'path';
import pinoMultiStream from 'pino-multi-stream';

const logFilePath = path.join(__dirname, 'app.log');

const prettyStream = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true, translateTime: true },
});

const fileStream = pino.destination({
  dest: logFilePath,
  sync: false,
});

const streams = [
  { stream: prettyStream },
  { stream: fileStream }
];

export const logger = pino({}, pinoMultiStream.multistream(streams));
