import { SQSTask } from "../workers/generic.aws.sqs";
import { BullMQTask } from "../workers/generic.bullmq";

export default function getQueueUrl(region: string, accountId: string, queueName: string): string {

    if (!region || !accountId || !queueName) {
        throw new Error('Missing required environment variables');
    }

    return `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;
}

export function isSQSTask(sqsTask: SQSTask): boolean {
    return sqsTask instanceof SQSTask;
}

export function isBullMQTask(bullMqTask: BullMQTask): boolean {
    return bullMqTask instanceof BullMQTask;
}
