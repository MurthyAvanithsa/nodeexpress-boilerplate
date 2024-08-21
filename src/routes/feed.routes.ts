import { Router, Request, Response } from 'express';
import {
    Feed,
    GetFeedsResponse,
    PostFeedResponse,
    GetFeedResponse,
    UpdateFeedResponse,
    DeleteFeedResponse,
    PostFeedRequestBody,
    UpdateFeedRequestBody
} from '../types/feed.types';
import { getFeeds, createFeed, getFeedById } from '../services/feed.services';

const feedRouter = Router();

feedRouter.get('/feed', async (req: Request, res: Response<GetFeedsResponse>) => {
    const responseData: GetFeedsResponse = { data: await getFeeds() };
    res.send(responseData);
});

feedRouter.post('/feed', async (req: Request<{}, PostFeedResponse, PostFeedRequestBody>, res: Response<PostFeedResponse>) => {
    const responseData: PostFeedResponse = { data: await createFeed(req.body) };
    res.send(responseData);
});

feedRouter.get('/feed/:feedId', async (req: Request<{ feedId: Pick<Feed, 'id'> }>, res: Response<GetFeedResponse>) => {
    const responseData: GetFeedResponse = { data: await getFeedById(req.params.feedId) };
    res.send(responseData);
});

feedRouter.put('/feed/:feedId', async (req: Request<{ feedId: string }, UpdateFeedResponse, UpdateFeedRequestBody>, res: Response<UpdateFeedResponse>) => {
    const responseData: UpdateFeedResponse = { data: req.body };
    res.send(responseData);
});

feedRouter.delete('/feed/:feedId', async (req: Request<{ feedId: string }>, res: Response<DeleteFeedResponse>) => {
    const responseData: DeleteFeedResponse = { message: "" };
    res.send(responseData);
});

export default feedRouter;