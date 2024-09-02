import { Router, Request, Response } from 'express';
import { addJob } from '../workers/generic';
import config from '../config';
import { CloudEventV1 } from 'cloudevents';
import { logger } from '../logger/log';
import { v4 as uuidv4 } from 'uuid';

const queueRouter = Router();
queueRouter.post('/job', async (req: Request<{}, {}>, res: Response) => {
    const job: any = req.body;
    const cloudevent: CloudEventV1<any> = {
        id: uuidv4(),
        source: '/mycontext',
        type: 'com.example.someevent',
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
        logger.error(`Error creating job: ${error}`);
        statusCode = 500;
        response = error;
    }
    res.status(statusCode).json(response);
});

export default queueRouter;
