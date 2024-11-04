import { Router, Request, Response, NextFunction } from 'express';

import {
    GetFeedsResponse,
    PostFeedResponse,
    GetFeedResponse,
    UpdateFeedResponse,
    DeleteFeedResponse,
    PostFeedRequestBody,
    UpdateFeedRequestBody,
    GetFeedByIdRequest,
    DeleteFeedRequest
} from '../types/types.feed';
import { getFeeds, createFeed, getFeedById, updateFeed, deleteFeed } from '../services/services.feed';
import { logger } from '../logger/log';

const feedRouter: Router = Router();

feedRouter.get('/feed', async (req: Request, res: Response<GetFeedsResponse>, next: NextFunction) => {
    try {
        const response: GetFeedsResponse = await getFeeds();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

feedRouter.post('/feed', async (req: Request<unknown, PostFeedResponse, PostFeedRequestBody>, res: Response<PostFeedResponse>, next: NextFunction) => {
    try {
        const feed: PostFeedRequestBody = req.body;
        const response: PostFeedResponse = await createFeed(feed);
        const responseCode = response.data ? 201: 500;
        res.status(responseCode).json(response);
    } catch (error) {
        next(error);
    }
});

feedRouter.get('/feed/:id', async (req: Request<GetFeedByIdRequest>, res: Response<GetFeedResponse>, next: NextFunction) => {
    try {
        const feedId = req.params.id;
        const response: GetFeedResponse = await getFeedById(feedId);
        const statusCode = 200;
        logger.setContext('id', feedId);
        res.status(statusCode).json(response);
    } catch (error) {
        next(error);
    }
});

feedRouter.put('/feed/:id', async (req: Request<GetFeedByIdRequest, UpdateFeedResponse, UpdateFeedRequestBody>, res: Response<UpdateFeedResponse>, next: NextFunction) => {
    try {
        const feedId = req.params.id;
        const feed: UpdateFeedRequestBody = req.body;
        const response: UpdateFeedResponse = await updateFeed(feedId, feed);
        const responseCode = response.data? 200 : 500;
        res.status(responseCode).json(response);
    } catch (error) {
        next(error);
    }
});

feedRouter.delete('/feed/:id', async (req: Request<DeleteFeedRequest, DeleteFeedResponse>, res: Response<DeleteFeedResponse>, next: NextFunction) => {
    try {
        const feedId = req.params.id;
        const response: DeleteFeedResponse = await deleteFeed(feedId);
        const responseCode = response.data? 204 : 500;
        res.status(responseCode).json(response);
    } catch (error) {
        next(error);
    }
});

export default feedRouter;