import { Worker, Job } from 'bullmq';

const redisOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
};

function startWorker(queueName: string) {
    console.log("Worker started... ")
    const worker = new Worker(queueName, async (job: Job) => {
        console.log(`Processing job with ID: ${job.id}, mediaId: ${job.data.mediaId}, data: ${JSON.stringify(job.data)}`);
    }, {
        connection: redisOptions,
        removeOnComplete: { count: 0 }
    });

    worker.on('error', (error) => {
        console.error('Worker error:', error);
    });

    worker.on('failed', (job, error) => {
        console.error(`Job $.id} failed with error: ${error.message}`);
    });

    worker.on('completed', (job) => {
        console.log(`Job ${job.id} completed successfully.`);
    });
}

export { startWorker };
