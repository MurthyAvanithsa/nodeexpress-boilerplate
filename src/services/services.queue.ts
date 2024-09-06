import * as queueRepos from "../repos/repos.queue";
import { getAllJobsRequest, getAllJobsResponse, getJobByIdResponse } from "../types/types.queue";
import { JobQueue as jobQueueModel } from "prisma/prisma-client"
async function getAllJobs(req: getAllJobsRequest): Promise<getAllJobsResponse> {
    const result = await queueRepos.getAllJobs({
        sort: req.sort || ["id", "asc"],
        filter: req.filter || {'1': '1'},
        pagination: req.pagination || [1, 10],
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
        data: result.data ?  ({
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

export { getAllJobs, getJobById }