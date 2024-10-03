import path from 'path';

import pino, {Logger, LoggerOptions} from 'pino';
import { multistream } from 'pino-multi-stream';

const logFilePath = path.join(__dirname, 'app.log');

const prettyStream = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true, translateTime: true },
});

const fileStream = pino.destination({
  dest: logFilePath,
  sync: false,
});

const contextMap = new Map<string, any>();

interface ExtendedLogger extends Logger {
  setContext(key: string, value: any): void;
  clearContext(): void;
  getContext(key: string): any;
}

export const logger: ExtendedLogger = pino({
  level: 'info',
  formatters: {
    log(object) {
      return {
        ...object,
        context: Object.fromEntries(contextMap),
      };
    },
  },
} as LoggerOptions, multistream([
  { stream: prettyStream },
  { stream: fileStream },
])) as ExtendedLogger;

logger.setContext = (key: string, value: any) => {
  contextMap.set(key, value);
};

logger.clearContext = () => {
  contextMap.clear();
};

logger.getContext = (key: string) => {
  return contextMap.get(key);
};

