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

async function createFeed(feed: Omit<Feed, 'id'>): Promise<Feed> {
    return {
        id: 78,
        name: "Dojo pbr",
        description: "feed",
        path: "tbn/dojo-pbr",
        config: { assetFilter: [], playlistFilters: [] },
        queryParams: [{ name: "playlistId", type: "string", required: true }],
    }
}

function updateFeed() {
    // To get feed by ID
}

function deleteFeed() {
    // To get feed by ID
}

export { getFeeds, getFeedById, createFeed, updateFeed, deleteFeed };