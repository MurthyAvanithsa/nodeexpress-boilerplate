import { CloudEventV1 } from "cloudevents";

import { logger } from "../logger/log";

export async function processJob(message: CloudEventV1<JSON>) {
    logger.info(`Processing message ${JSON.stringify(message)}`);
}