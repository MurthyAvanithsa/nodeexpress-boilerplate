import { Router, Request, Response } from 'express';
import { CloudEventV1 } from 'cloudevents';
import { v4 as uuidv4 } from 'uuid';

import { addJob } from '../services/services.queue';
import config from '../config';
import { Job } from '../types/types.queue';

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

export default queueRouter;