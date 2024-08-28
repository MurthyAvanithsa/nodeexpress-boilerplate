// src/repositories/feedRepo.ts
import { PrismaClient, Feed } from "@prisma/client";
import { logger } from "../logger/log";
import { FeedQueryParams } from "../types/types.feed";

const prisma = new PrismaClient();

type Result<T> = {
    data?: T;
    error?: string;
};

// Fetch all feeds
async function getFeeds(): Promise<Result<Feed[]>> {
    try {
        const feeds = await prisma.feed.findMany();
        return { data: feeds };
    } catch (error) {
        logger.error(`Error fetching feeds: ${JSON.stringify(error, null, 2)}`);
        return { error: "Could not fetch feeds" };
    }
}

// Fetch a single feed by ID
async function getFeedById(feedId: string): Promise<Result<Feed>> {
    try {
        const feed = await prisma.feed.findUnique({
            where: { id: feedId }
        });
        if (!feed) {
            return { error: `Feed with ID ${feedId} not found` };
        }
        return { data: feed };
    } catch (error) {
        logger.error(`Error fetching feed by ID ${feedId}: ${JSON.stringify(error, null, 2)}`);
        return { error: "Could not fetch feed" };
    }
}

// Create a new feed
async function createFeed(req: {
    id?: any,
    path: string;
    name: string;
    config: object;
    queryParams: FeedQueryParams[];
}): Promise<Result<Feed>> {
    try {
        const feed = await prisma.feed.create({
            data: req
        });
        return { data: feed };
    } catch (error) {
        logger.error(`Error creating feed with path ${req.path}: ${JSON.stringify(error, null, 2)}`);
        return { error: "Could not create feed" };
    }
}

// Update a feed by ID
async function updateFeed(feedId: string, updates: {
    path?: string;
    name?: string;
    config: {};
    queryParams: FeedQueryParams[];
}): Promise<Result<Feed>> {
    try {
        const feed = await prisma.feed.update({
            where: { id: feedId },
            data: updates
        });
        return { data: feed };
    } catch (error) {
        logger.error(`Error updating feed with ID ${feedId}: ${JSON.stringify(error, null, 2)}`);
        return { error: "Could not update feed" };
    }
}

// Delete a feed by ID
async function deleteFeed(feedId: string): Promise<Result<null>> {
    try {
        await prisma.feed.delete({
            where: { id: feedId }
        });
        return { data: null };
    } catch (error) {
        logger.error(`Error deleting feed with ID ${feedId}: ${JSON.stringify(error, null, 2)}`);
        return { error: "Could not delete feed" };
    }
}

export { getFeeds, getFeedById, createFeed, updateFeed, deleteFeed };
