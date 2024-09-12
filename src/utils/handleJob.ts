import { logger } from "../logger/log";

export function processJob(message: string) {
    logger.info(`Processing message ${JSON.stringify(message)}`);
}