import { Feed } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";

import { prismaConnection as prisma } from "../connections";
import { FeedQueryParams } from "../types/types.feed";


type Result<T> = {
    data?: T;
    error?: string;
};

// Fetch all feeds
async function getFeeds(): Promise<Result<Feed[]>> {
    const feeds = await prisma.feed.findMany();
    return { data: feeds };
}

// Fetch a single feed by ID
async function getFeedById(feedId: string): Promise<Result<Feed>> {
    const feed = await prisma.feed.findUnique({
        where: { id: feedId }
    });
    if (!feed) {
        throw new Error(`Feed with ID ${feedId} not found`);
    }
    return { data: feed };
}

// Create a new feed
async function createFeed(req: {
    id?: any,
    path: string;
    name: string;
    config: object;
    queryParams: FeedQueryParams[];
}): Promise<Result<Feed>> {
    const feed = await prisma.feed.create({
        data: req
    });
    return { data: feed };
}

// Update a feed by ID
async function updateFeed(feedId: string, updates: {
    path?: string;
    name?: string;
    config: InputJsonValue;
    queryParams: FeedQueryParams[];
}): Promise<Result<Feed>> {
    const feed = await prisma.feed.update({
        where: { id: feedId },
        data: updates
    });
    return { data: feed };
}

// Delete a feed by ID
async function deleteFeed(feedId: string): Promise<Result<null>> {
    await prisma.feed.delete({
        where: { id: feedId }
    });
    return { data: null };
}

export { getFeeds, getFeedById, createFeed, updateFeed, deleteFeed };
