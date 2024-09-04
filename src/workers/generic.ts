import { Worker, Job, Queue } from "bullmq";
import { redisConnection } from "../connections";
import { logger } from "../logger/log";
import { createJobQueue, updateJobQueueResults } from "../repos/repos.queue";
import { CloudEventV1 } from "cloudevents";

function startWorker(queueName: string) {
  logger.info("Worker started... ");
  let jobId: string | undefined;
  const worker = new Worker(
    queueName,
    async (job: Job) => {
      logger.debug("job 1");
      jobId = job.id;

      // To test job failure
      // throw new Error("Testing Failure error");
      logger.info(`Processing job with ID: ${job.id} data: ${JSON.stringify(job.data)}`);
    },
    {
      connection: redisConnection,
      removeOnComplete: { count: 100 },
    }
  );
  
  worker.on("error", (error) => {
    // UPdate JOB_QUEUE table with error along with job id
    logger.error("Worker error:", error);
    updateJobQueueResults(queueName, jobId || "", { status: "Error", error: error.message });
  });

  worker.on("failed", (job, error) => {
    // UPdate JOB_QUEUE table with error along with job id
    updateJobQueueResults(queueName, job?.id || "", { status: "Failed", error: error.message, completedAt: new Date().toISOString() });
    logger.error(`Job ${job?.id} failed with error: ${error.message}`);
  });

  worker.on("completed", (job) => {
    // UPdate JOB_QUEUE table with status along with job id
    updateJobQueueResults(queueName, job?.id || "", { status: "Completed", completedAt: new Date().toISOString() });
    logger.info(`Job ${job.id} completed successfully.`);
  });

  // To test job execution error
  // throw new Error("Testing worker job execution error");
}

// Come up with cloudevent as a message format
async function addJob(queueName: string, data: CloudEventV1<any>) {
  const queue = new Queue(queueName, { connection: redisConnection });
  queue.add(queueName, data).then(async createdJob => {
    createJobQueue(queueName, createdJob.id || "", createdJob.data);
  });
  return { status: "Processing..." };
}

export { startWorker, addJob };
