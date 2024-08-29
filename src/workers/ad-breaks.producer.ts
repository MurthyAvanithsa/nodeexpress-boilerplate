import { Queue } from 'bullmq';
import getAdBreaks from './csv';

const redisOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
};

const adBreaksQueue = new Queue("adBreaksQueue", { connection: redisOptions });

async function addAdBreaksToQueue() {
    try {
        console.log("Fetching ad breaks...");
        const adBreaks = await getAdBreaks();

        console.log(`Adding ${adBreaks.length} ad breaks to the queue.`);
        const addPromises = adBreaks.map(adBreak => 
            adBreaksQueue.add('adBreakJob', adBreak)
        );
        await Promise.all(addPromises);
        await adBreaksQueue.close();
        console.log('All ad breaks have been added to the queue.');
    } catch (error) {
        console.error('Error adding ad breaks to the queue:', error);
    }
}

addAdBreaksToQueue();
