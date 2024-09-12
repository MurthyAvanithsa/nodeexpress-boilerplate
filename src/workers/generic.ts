import { CloudEventV1 } from "cloudevents";

import { SQSService } from "../utils/consumer";
import { createJobQueue } from "../repos/repos.queue";
import { postMessageResponse } from "../types/types.queue";

function startWorker(queueName: string) {
  const sqsService: SQSService = new SQSService(queueName);
  sqsService.startConsumer();
}

async function addJob(queueName: string, data: CloudEventV1<JSON>) {
  const sqsService: SQSService = new SQSService(queueName);
  const result: postMessageResponse = await sqsService.postMessage(data);
  if (result.status) {
    const jobData: CloudEventV1<JSON> = result.data?.payload as unknown as CloudEventV1<JSON>;
    createJobQueue(queueName, result?.data?.messageId || "", jobData);
  }
  return result.status ? { status: "Processing..." } : { status: "Failed to add..." };
}

export { startWorker, addJob };
