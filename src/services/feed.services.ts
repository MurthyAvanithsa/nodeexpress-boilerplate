import { Feed } from '../types/feed.types';
async function getFeeds(): Promise<Omit<Feed, 'config' | 'queryParams'>[]> {
    return [
        {
            id: 78,
            name: "Dojo pbr",
            description: "feed",
            path: "tbn/dojo-pbr",
        },
    ];
}

async function getFeedById(id: Pick<Feed, 'id'>): Promise<Feed> {
    return {
        id: 78,
        name: "Dojo pbr",
        description: "feed",
        path: "tbn/dojo-pbr",
        config: { assetFilter: [], playlistFilters: [] },
        queryParams: [{ name: "playlistId", type: "string", required: true }],
    }
}

async function createFeed(feed: Omit<Feed, 'id' | 'config'>): Promise<Feed> {
    return {
        id: 78,
        name: "Dojo pbr",
        description: "feed",
        path: "tbn/dojo-pbr",
        config: { assetFilter: [], playlistFilters: [] },
        queryParams: [{ name: "playlistId", type: "string", required: true }],
    }
}

async function updateFeed(id: Pick<Feed, 'id'>, feed: Omit<Feed, "id">): Promise<Feed> {
    return {
        id: 78,
        name: "Dojo pbr",
        description: "feed",
        path: "tbn/dojo-pbr",
        config: { assetFilter: [], playlistFilters: [] },
        queryParams: [{ name: "playlistId", type: "string", required: true }],
    }
}

async function deleteFeed(id: Pick<Feed, 'id'>): Promise<Pick<Feed, 'id'>> {
    return {
        id: 20
    }
}

export { getFeeds, getFeedById, createFeed, updateFeed, deleteFeed };
