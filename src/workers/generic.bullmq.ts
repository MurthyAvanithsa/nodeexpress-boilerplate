import { Worker, Job, Queue } from "bullmq";
import { CloudEventV1 } from "cloudevents";
import IORedis from "ioredis";

import { redisConnection } from "../connections";
import { createJobQueue, updateJobQueueResults } from "../repos/repos.queue";
import * as QueueTypes from "../types/types.queue";
import { logger } from "../logger/log";

export class BullMQTask {
  protected worker!: Worker;
  private queueName: string;
  private redisConnection: IORedis;

  constructor(queueName: string) {
    this.queueName = queueName;
    this.redisConnection = redisConnection;
  }

  public async startConsumer(
    consumerFunc: (message: CloudEventV1<QueueTypes.Job>) => Promise<void>
  ): Promise<void> {
    this.worker = new Worker(
      this.queueName,
      async (job: Job) => {
        const message = job.data as CloudEventV1<QueueTypes.Job>;
        await consumerFunc(message);
      },
      {
        connection: this.redisConnection,
        removeOnComplete: { count: 100 },
        stalledInterval: 1000 // Check for stalled jobs every 1 seconds
      }
    );
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.worker.on('ready', () => {
      logger.info("Worker is running.");
    });

    this.worker.on('error', (error) => {
      logger.error(`Worker error: ${error}`);
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

  async postMessage(data: CloudEventV1<QueueTypes.Job>): Promise<QueueTypes.postMessageResponse> {
    const queue = new Queue(this.queueName, { connection: redisConnection });
    try {
      const createdJob = await queue.add(this.queueName, data);
      createJobQueue(this.queueName, createdJob.id || "", createdJob.data);
      return { data: { messageId: createdJob.id, payload: createdJob.data }, status: true };
    } catch (error) {
      console.error('Error creating job queue:', error);
      return { error, status: false };
    }
  }
}
