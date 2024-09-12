export default function getQueueUrl(region: string, accountId: string, queueName: string): string {

    if (!region || !accountId || !queueName) {
      throw new Error('Missing required environment variables');
    }

    return `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;
  }
