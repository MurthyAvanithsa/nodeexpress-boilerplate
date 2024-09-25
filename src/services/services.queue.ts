import { JobQueue as jobQueueModel } from "prisma/prisma-client";
import { CloudEventV1 } from "cloudevents";

import * as queueRepos from "../repos/repos.queue";
import { getAllJobsRequest, getAllJobsResponse, getJobByIdResponse, Job, postMessageResponse } from "../types/types.queue";
import { queueProcessingTask } from "../index"
async function addJob(queueName: string, data: CloudEventV1<Job>) {
    const result: postMessageResponse = await queueProcessingTask.postMessage(data);
    return result.status ? { message: `Added job with id ${result.data?.messageId}.` } : { error: `Failed to add ${result?.error}` };
}

async function getAllJobs(req: getAllJobsRequest): Promise<getAllJobsResponse> {
    const result = await queueRepos.getAllJobs({
        sort: req.sort,
        filter: req.filter,
        pagination: req.pagination,
    });
    if (result.error) {
        return { error: result.error }
    }
    return {
        data: result.data!.map((job: jobQueueModel) => ({
            id: job.id,
            queueName: job.queueName,
            jobId: job.jobId,
            status: job.status,
            payload: job.payload,
            createdAt: job.createdAt,
            completedAt: job.completedAt,
            error: job.error
        }))
    };
}

async function getJobById(id: string): Promise<getJobByIdResponse> {
    const result = await queueRepos.getJobById(id);
    if (result.error) {
        return { error: result.error }
    }
    return {
        data: result.data ? ({
            id: result.data.id,
            queueName: result.data.queueName,
            jobId: result.data.jobId,
            status: result.data.status,
            payload: result.data.payload,
            createdAt: result.data.createdAt,
            completedAt: result.data.completedAt,
            error: result.data.error
        }) : null
    };
}

export { getAllJobs, getJobById, addJob }