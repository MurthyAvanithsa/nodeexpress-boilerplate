import { Router, Request, Response } from 'express';
import { CloudEventV1 } from 'cloudevents';
import { v4 as uuidv4 } from 'uuid';

import { addJob } from '../workers/generic';
import config from '../config';
import { getAllJobs, getJobById } from '../services/services.queue';
import { getAllJobsRequest, getAllJobsResponse, getJobByIdResponse } from '../types/types.queue';
import { logger } from '../logger/log';

const queueRouter = Router();
queueRouter.post('/job', async (req: Request, res: Response) => {
    const job: JSON = req.body;
    const cloudevent: CloudEventV1<JSON> = {
        id: uuidv4(),
        source: '/mycontext',
        type: 'com.example.job.created',
        specversion: '1.0',
        datacontenttype: 'application/json',
        time: new Date().toISOString(),
        data: job
    };
    let response, statusCode;
    try {
        response = await addJob(config.queue.GENERIC_WORKER_QUEUE, cloudevent);
        statusCode = 201;
    } catch (error) {
        statusCode = 500;
        response = error;
    }
    res.status(statusCode).json(response);
});

queueRouter.get("/job", async(req: Request<unknown, getAllJobsResponse, unknown>, res: Response<getAllJobsResponse>) => {
    const queryParams = req.query;
    const requestPayload: getAllJobsRequest = {
        sort: JSON.parse(String(queryParams.sort || JSON.stringify(['id', 'asc']))),
        filter: JSON.parse(String(queryParams.filter || JSON.stringify({'1': '1'}))),
        pagination: JSON.parse(String(queryParams.pagination || JSON.stringify([0, 10])))
    };
    const response: getAllJobsResponse = await getAllJobs(requestPayload);
    const statusCode = response.data ? 200 : 500;
    res.status(statusCode).json(response);
});

queueRouter.get("/job/:id", async(req: Request<{id: string}>, res: Response) => {
    const jobId = req.params.id;
    logger.info(jobId)
    const response: getJobByIdResponse = await getJobById(jobId);
    const statusCode = response.data ? 200 : 500;
    res.status(statusCode).json(response);
});

export default queueRouter;
