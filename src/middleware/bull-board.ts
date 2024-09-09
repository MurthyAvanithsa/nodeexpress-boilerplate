import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express'; // Import ExpressAdapter
import { Queue } from 'bullmq';

import config from '../config';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/bull-board/ui');

const queue = new Queue(config.queue.GENERIC_WORKER_QUEUE, {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });

createBullBoard({
  queues: [
    new BullMQAdapter(queue),
  ],
  serverAdapter,
});

const bullBoardUI = serverAdapter.getRouter();

export default bullBoardUI;