import { CloudEvent } from "cloudevents";
import { prismaConnection } from "../connections";
import { JobQueue as jobQueueModel } from "@prisma/client"
import { logger } from "../logger/log";

async function createJobQueue(queueName: string, id: string, payload: CloudEvent): Promise<jobQueueModel> {
    const insertedJob: jobQueueModel = await prismaConnection.jobQueue.create({
        data: {
            queueName: queueName,
            status: "Waiting",
            jobId: id,
            payload: payload,
            createdAt: payload.time
        }
    });
    return insertedJob;
}

async function updateJobQueueResults(queueName: string, id: string, updates: { status: string, completedAt?: string, error?: string }) {
    const updatedJob = await prismaConnection.jobQueue.update({
        where: {
            queueName_jobId: {
                queueName: queueName,
                jobId: id
            }
        },
        data: updates
    });
    return updatedJob;
}
export { createJobQueue, updateJobQueueResults }
