import { CloudEventV1 } from "cloudevents";

import { SQSTask } from "../utils/consumer";
import { createJobQueue } from "../repos/repos.queue";
import { postMessageResponse } from "../types/types.queue";

function startWorker(queueName: string) {
  const sqsService: SQSTask = new SQSTask(queueName);
  sqsService.startConsumer();
}

async function addJob(queueName: string, data: CloudEventV1<JSON>) {
  const sqsService: SQSTask = new SQSTask(queueName);
  const result: postMessageResponse = await sqsService.postMessage(data);
  if (result.status) {
    const jobData: CloudEventV1<JSON> = result.data?.payload as unknown as CloudEventV1<JSON>;
    createJobQueue(queueName, result?.data?.messageId || "", jobData);
  }
  return result.status ? { status: "Processing..." } : { status: "Failed to add..." };
}

export { startWorker, addJob };
