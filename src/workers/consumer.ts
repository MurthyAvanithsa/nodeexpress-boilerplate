// /* eslint-disable @typescript-eslint/no-unused-expressions */
import { processJob } from "../utils/handleJob";
import { queueProcessingTask } from "..";


function startWorker() {
  queueProcessingTask.startConsumer(processJob)
  // config.queue.queueProcessingMethod === "aws-sqs" ? (queueProcessingTask as SQSTask).startConsumer(processSqsJob) : (queueProcessingTask as BullMQTask).startBullMq(processBullMQJob);
}

export { startWorker };