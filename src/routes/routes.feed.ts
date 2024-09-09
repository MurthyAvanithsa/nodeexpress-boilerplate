import { Router, Request, Response } from 'express';

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


const feedRouter = Router();

feedRouter.get('/feed', async (req: Request, res: Response<GetFeedsResponse>) => {
    const response: GetFeedsResponse = await getFeeds();
    const responseCode = response.error ? 500 : 200;
    res.status(responseCode).json(response);
});

feedRouter.post('/feed', async (req: Request<unknown, PostFeedResponse, PostFeedRequestBody>, res: Response<PostFeedResponse>) => {
    const feed: PostFeedRequestBody = req.body;
    const response: PostFeedResponse = await createFeed(feed);
    const responseCode = response.data ? 201: 500;
    res.status(responseCode).json(response);
});

feedRouter.get('/feed/:id', async (req: Request<GetFeedByIdRequest>, res: Response<GetFeedResponse>) => {
    const feedId = req.params.id;
    const response: GetFeedResponse = await getFeedById(feedId);
    const responseCode = !response.data ? response.error === `Feed with ID ${feedId} not found` ? 404: 500 : 200;
    res.status(responseCode).json(response); 
});

feedRouter.put('/feed/:id', async (req: Request<GetFeedByIdRequest, UpdateFeedResponse, UpdateFeedRequestBody>, res: Response<UpdateFeedResponse>) => {
    const feedId = req.params.id;
    const feed: UpdateFeedRequestBody = req.body;
    const response: UpdateFeedResponse = await updateFeed(feedId, feed);
    const responseCode = response.data? 200 : 500;
    res.status(responseCode).json(response);
});

feedRouter.delete('/feed/:id', async (req: Request<DeleteFeedRequest, DeleteFeedResponse>, res: Response<DeleteFeedResponse>) => {
    const feedId = req.params.id;
    const response: DeleteFeedResponse = await deleteFeed(feedId);
    const responseCode = response.data? 204 : 500;
    res.status(responseCode).json(response);
});

export default feedRouter;
