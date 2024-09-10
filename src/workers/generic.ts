import { Worker, Job, Queue } from "bullmq";
import { CloudEventV1 } from "cloudevents";
import IORedis from "ioredis";

import { redisConnection } from "../connections";
import { logger } from "../logger/log";
import { createJobQueue, updateJobQueueResults } from "../repos/repos.queue";

abstract class CustomWorker {
  protected worker: Worker;
  private queueName: string;
  private redisConnection: IORedis;

  constructor(queueName: string, redisConnection: IORedis) {
    this.queueName = queueName;
    this.redisConnection = redisConnection;

    this.worker = new Worker(
      this.queueName,
      this.processJob.bind(this),
      {
        connection: this.redisConnection,
        removeOnComplete: { count: 100 },
      }
    );

    this.setupEventHandlers();
  }

  // Abstract method to be implemented by subclasses
  protected abstract processJob(job: Job): Promise<void>;

  private setupEventHandlers(): void {
    this.worker.on('error', (error) => {
      logger.error('Worker error:', error);
      updateJobQueueResults(this.queueName, '', { status: 'Error', error: error.message });
    });

    this.worker.on('failed', (job, error) => {
      updateJobQueueResults(this.queueName, job?.id || '', { status: 'Failed', error: error.message, completedAt: new Date().toISOString() });
      logger.error(`Job ${job?.id} failed with error: ${error.message}`);
    });

    this.worker.on('completed', (job) => {
      updateJobQueueResults(this.queueName, job?.id || '', { status: 'Completed', completedAt: new Date().toISOString() });
      logger.info(`Job ${job.id} completed successfully.`);
    });
  }
}

class AdBreaksWorker extends CustomWorker {
  constructor(queueName: string, redisConnection: IORedis) {
    super(queueName, redisConnection);
    logger.info(`Worker running on queue: ${this.worker.name}`)
  }

  protected async processJob(job: Job): Promise<void> {
    logger.info(`Custom processing job with ID: ${job.id} data: ${JSON.stringify(job.data)}`);
  }
}

function startWorker(queueName: string) {
  new AdBreaksWorker(queueName, redisConnection);
}

async function addJob(queueName: string, data: CloudEventV1<JSON>) {
  const queue = new Queue(queueName, { connection: redisConnection });
  queue.add(queueName, data).then(async createdJob => {
    createJobQueue(queueName, createdJob.id || "", createdJob.data);
  });
  return { status: "Processing..." };
}

export { startWorker, addJob };
