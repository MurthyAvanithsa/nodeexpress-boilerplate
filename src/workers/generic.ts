import { processJob } from "../utils/handleJob";
import { sqsTask } from "../index"

import { SQSTask } from "./consumer";

function createSqsTask(queueName: string): SQSTask {
  return new SQSTask(queueName);
}

function startWorker() {
  sqsTask.startConsumer(processJob);
}

export { startWorker, createSqsTask };