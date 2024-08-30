import { Worker, Job, Queue } from "bullmq";
import config from "../config";
import { redisConnection } from "../connections";



function startWorker(queueName: string) {
    // Use looger instead of console.log
  console.log("Worker started... ");
  const worker = new Worker(
    queueName,
    async (job: Job) => {
      console.log(
        `Processing job with ID: ${job.id}, mediaId: ${
          job.data.mediaId
        }, data: ${JSON.stringify(job.data)}`
      );
    },
    {
      connection: redisConnection,
      removeOnComplete: { count: 0 },
    }
  );        

  worker.on("error", (error) => {
    // UPdate JOB_QUEUE table with error along with job id
    console.error("Worker error:", error);
  });

  worker.on("failed", (job, error) => {
    // UPdate JOB_QUEUE table with error along with job id
    console.error(`Job $.id} failed with error: ${error.message}`);
  });

  worker.on("completed", (job) => {
    // UPdate JOB_QUEUE table with status along with job id
    console.log(`Job ${job.id} completed successfully.`);
  });
}

// Come up with cloudevent as a message format
async function addJob(queueName: string, data: any) {
    const adBreaksQueue = new Queue("adBreaksQueue", { connection: redisConnection });
    const result = await adBreaksQueue.add(queueName, data);
    // Add record to table JOB_QUEUE
}
export { startWorker, addJob };
