import { CloudEvent } from "cloudevents";
import { JobQueue as jobQueueModel } from "@prisma/client"

import { prismaConnection } from "../connections";
import { logger } from "../logger/log";
import { getAllJobsRequest } from "../types/types.queue";

type Result<T> = {
    data?: T;
    error?: string;
};

async function createJobQueue(queueName: string, id: string, payload: CloudEvent): Promise<Result<jobQueueModel>> {
    try {
        const insertedJob: jobQueueModel = await prismaConnection.jobQueue.create({
            data: {
                queueName: queueName,
                status: "Waiting",
                jobId: id,
                payload: payload,
                createdAt: payload.time
            }
        });
        return { data: insertedJob };
    } catch (error: any) {
        logger.error(`Error creating job: ${error}`);
        return { error: error.meta ? error.meta.cause ? error.meta.cause : error : error };
    }
}

async function updateJobQueueResults(queueName: string, id: string, updates: { status: string, completedAt?: string | null, error?: string | null }): Promise<Result<jobQueueModel>> {
    try {
        const updatedJob = await prismaConnection.jobQueue.update({
            where: {
                queueName_jobId: {
                    queueName: queueName,
                    jobId: id
                }
            },
            data: updates
        });
        return { data: updatedJob };
    } catch (error: any) {
        logger.error(`Error updating jobs: ${error}`);
        return { error: error.meta ? error.meta.cause ? error.meta.cause : error : error };
    }
}

async function getAllJobs(req: getAllJobsRequest): Promise<Result<jobQueueModel[]>> {
    try {
        const { sort, filter, pagination } = req;
        const filterKey = Object.keys(filter)[0];
        const [sortBy, order] = sort;
        const [page, perPage] = pagination;
        const jobs = await prismaConnection.jobQueue.findMany({
            where : {
                [filterKey]: filter?.filterKey
            },
            orderBy: {
                    [sortBy]: order.toLowerCase()
                },
                skip: page * perPage,
                take: perPage
        });
        return { data: jobs };
    } catch (error: any) {
        logger.error(`Error fetching jobs:${error}`);
        return { error: error.meta ? error.meta.cause ? error.meta.cause : error : error };
    }
}

async function getJobById(id: string): Promise<Result<jobQueueModel>> {
    try {
        const job = await prismaConnection.jobQueue.findUnique({
           where :{
            id: id
           }
        });
        if (!job) {
            return {error: "Not found"}
        }
        return { data: job };
    } catch (error: any) {
        logger.error(`Error fetching jobs:${error}`);
        return { error: error.meta ? error.meta.cause ? error.meta.cause : error : error };
    }
}

export { createJobQueue, updateJobQueueResults, getAllJobs, getJobById }
