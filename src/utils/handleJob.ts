import { CloudEventV1 } from "cloudevents";

import { logger } from "../logger/log";
import * as QueueTypes from "../types/types.queue";


export async function processJob(message: CloudEventV1<QueueTypes.Job>) {
    logger.info(`Processing message ${JSON.stringify(message)}`);
}
