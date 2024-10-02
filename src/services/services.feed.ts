import {
    GetFeedsResponse,
    PostFeedResponse,
    GetFeedResponse,
    UpdateFeedResponse,
    DeleteFeedResponse,
    PostFeedRequestBody,
    UpdateFeedRequestBody,
} from '../types/types.feed';
import * as feedRepo from '../repos/repos.feed';

async function getFeeds(): Promise<GetFeedsResponse> {
    const result = await feedRepo.getFeeds();
    return {
        data: result.data!.map(feed => ({
            id: feed.id,
            name: feed.name,
            path: feed.path
        }))
    };
}

async function getFeedById(id: string): Promise<GetFeedResponse> {
    const result = await feedRepo.getFeedById(id);
    return { data: result.data! };
}

async function createFeed(req: PostFeedRequestBody): Promise<PostFeedResponse> {
    const result = await feedRepo.createFeed({
        path: req.path,
        name: req.name,
        config: req.config,
        queryParams: req.queryParams
    });

    return { data: result.data! };
}

async function updateFeed(id: string, updates: UpdateFeedRequestBody): Promise<UpdateFeedResponse> {
    const result = await feedRepo.updateFeed(id, {
        path: updates.path,
        name: updates.name,
        config: updates.config,
        queryParams: updates.queryParams
    });

    return { data: result.data! };
}

async function deleteFeed(id: string): Promise<DeleteFeedResponse> {
    await feedRepo.deleteFeed(id);
    return { data: { id } };
}

export { getFeeds, getFeedById, createFeed, updateFeed, deleteFeed };