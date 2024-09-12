import { SQSClient, SendMessageCommand, Message } from "@aws-sdk/client-sqs";
import { Consumer } from 'sqs-consumer';
import { CloudEventV1 } from "cloudevents";

import { logger } from '../logger/log';
import config from '../config';
import { updateJobQueueResults } from "../repos/repos.queue";
import { postMessageResponse } from "../types/types.queue";

import getQueueUrl from './sqsHelper';

export class SQSService {
  private sqsClient: SQSClient;
  private queueUrl: string;
  private queueName: string;

  constructor(queueName: string) {
    this.queueName = queueName;
    this.sqsClient = new SQSClient({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
        sessionToken: config.aws.sessionToken
      }
    });
    this.queueUrl = getQueueUrl(config.aws.region, config.aws.accountId, config.aws.queueName);
  }

  // Method to post a message to the SQS queue
  public async postMessage(
    data: CloudEventV1<JSON>,
  ): Promise<postMessageResponse> {
    const params = {
      MessageBody: JSON.stringify(data),
      QueueUrl: this.queueUrl
    };

    try {
      const command = new SendMessageCommand(params);
      const result = await this.sqsClient.send(command);
      return { data: { messageId: result.MessageId, payload: data }, status: true };
    } catch (error) {
      logger.error('Error sending message:', error);
      return { error, status: false };
    }
  }

  // Method to start a consumer for the SQS queue
  public startConsumer(
    processJob: (message: Message) => Promise<void> = async (message) => {
      logger.info(`Default job processor ${JSON.stringify(message)}`);
    }
  ): void {
    const worker = Consumer.create({
      queueUrl: this.queueUrl,
      sqs: this.sqsClient,
      handleMessage: async (message: Message) => {
        await processJob(message);
      },
      batchSize: 2,
      visibilityTimeout: 30
    });

    let messageId: string | undefined;
    worker.on('error', (err) => {
      logger.error(`Consumer error: ${err}`);
    });

    worker.on('message_received', (message) => {
      messageId = message.MessageId;
    });

    worker.on('processing_error', (error) => {
      logger.error(`Processing error: ${error}`);
      updateJobQueueResults(
        this.queueName,
        messageId || "",
        { status: "Failed", completedAt: new Date().toISOString(), error: JSON.stringify(error) }
      );
    });

    worker.on('message_processed', (message) => {
      logger.info(`Message processed: ${JSON.stringify(message)}`);
      updateJobQueueResults(
        this.queueName,
        message.MessageId || "",
        { status: "Completed", completedAt: new Date().toISOString() }
      );
    });

    worker.start();
    logger.info(`Worker started and listening ${this.queueName}`);
  }
}

export default SQSService;

