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
    if (result.error) {
        return { error: result.error };
    }
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
    if (result.error) {
        return { error: result.error };
    }
    return { data: result.data! };
}

async function createFeed(req: PostFeedRequestBody): Promise<PostFeedResponse> {
    const result = await feedRepo.createFeed({
        path: req.path,
        name: req.name,
        config: req.config,
        queryParams: req.queryParams
    });
    if (result.error) {
        return { error: result.error };
    }
    return { data: result.data! };
}

async function updateFeed(id: string, updates: UpdateFeedRequestBody): Promise<UpdateFeedResponse> {
    const result = await feedRepo.updateFeed(id, {
        path: updates.path,
        name: updates.name,
        config: updates.config,
        queryParams: updates.queryParams
    });
    if (result.error) {
        return { error: result.error };
    }
    return { data: result.data! };
}

async function deleteFeed(id: string): Promise<DeleteFeedResponse> {
    const result = await feedRepo.deleteFeed(id);
    if (result.error) {
        return { error: result.error };
    }
    return { data: { id } };
}

export { getFeeds, getFeedById, createFeed, updateFeed, deleteFeed };
