import { CloudEventV1 } from "cloudevents";

import { logger } from "../logger/log";
import { Job } from "../types/types.queue";

export async function processJob(message: CloudEventV1<Job>) {
    logger.info(`Processing message ${JSON.stringify(message)}`);
}