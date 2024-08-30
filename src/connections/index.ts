import { Queue, Worker } from 'bullmq';
import { PrismaClient } from '@prisma/client'
import IORedis from 'ioredis';
import config from '../config';

const redisConnection = new IORedis(
    config.redis.port,
    config.redis.host
);

const prismaConnection = new PrismaClient({
    datasources: {
        db: {
            url: `postgresql://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.name}?connection_limit=${config.db.connectionLimit}`,
        },
    },
  log: ['info'],
})

export { redisConnection, prismaConnection };