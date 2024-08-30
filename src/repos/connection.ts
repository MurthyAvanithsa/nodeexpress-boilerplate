import { PrismaClient } from "@prisma/client";
import { logger } from "../logger/log";
import IORedis from 'ioredis';

const REDIS_HOST = "localhost";
const REDIS_PORT = 6379;

const connection = new IORedis(REDIS_PORT, REDIS_HOST);

const pgClient = new PrismaClient();

export default pgClient;
