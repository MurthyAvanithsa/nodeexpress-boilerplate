import { Router, Request, Response } from 'express';
import { CloudEventV1 } from 'cloudevents';
import { v4 as uuidv4 } from 'uuid';

import { addJob, getAllJobs, getJobById } from '../services/services.queue';
import config from '../config';
import { getAllJobsRequest, getAllJobsResponse, getJobByIdResponse, Job } from '../types/types.queue';
import { logger } from '../logger/log';

const queueRouter = Router();

queueRouter.post('/job', async (req: Request<unknown, unknown, Job>, res: Response) => {
    const jobType = req.headers["content-type"];
    const eventType = req.headers["event-type"];

    const job: Job = req.body;

    const cloudevent: CloudEventV1<typeof job> = {
        id: uuidv4(),
        source: '/job',
        type: Array.isArray(eventType) ? eventType[0] : eventType || '',
        specversion: '1.0',
        datacontenttype: jobType,
        time: new Date().toISOString(),
        data: job
    };
    const response = await addJob(config.aws.queueName, cloudevent);
    const statusCode = response.error ? 500 : 201;
    res.status(statusCode).json(response);
});

queueRouter.get("/job", async (req: Request<unknown, getAllJobsResponse, unknown>, res: Response<getAllJobsResponse>) => {
    const queryParams = req.query;
    const requestPayload: getAllJobsRequest = {
        sort: JSON.parse(String(queryParams.sort || JSON.stringify(['id', 'asc']))),
        filter: JSON.parse(String(queryParams.filter || JSON.stringify({}))),
        pagination: JSON.parse(String(queryParams.pagination || JSON.stringify([0, 10])))
    };
    const response: getAllJobsResponse = await getAllJobs(requestPayload);
    const statusCode = response.data ? 200 : 500;
    res.status(statusCode).json(response);
});

queueRouter.get("/job/:id", async (req: Request<{ id: string }>, res: Response) => {
    const jobId = req.params.id;
    logger.info(jobId)
    const response: getJobByIdResponse = await getJobById(jobId);
    const statusCode = response.data ? 200 : 500;
    res.status(statusCode).json(response);
});

export default queueRouter;