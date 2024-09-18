import { Router, Request, Response } from 'express';

import { getJobById, getAllJobs } from '../../repos/repos.queue';
import { getAllJobsRequest, getAllJobsResponse, getJobByIdResponse } from '../../types/types.queue';
import { logger } from '../../logger/log';

const publicRouter = Router();

publicRouter.get("/job", async (req: Request<unknown, getAllJobsResponse, unknown>, res: Response<getAllJobsResponse>) => {
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

publicRouter.get("/job/:id", async (req: Request<{ id: string }>, res: Response) => {
    const jobId = req.params.id;
    logger.info(jobId)
    const response: getJobByIdResponse = await getJobById(jobId);
    const statusCode = response.data ? 200 : 500;
    res.status(statusCode).json(response);
});

export default publicRouter;
