import { PrismaClient } from '@prisma/client';
import { logger } from '../logger/log';


async function loadSeedData() {
    const prisma = new PrismaClient();
    try {
        const existingFilters = await prisma.filter.findMany();
        if (existingFilters.length === 0) {
            await prisma.filter.createMany({
                data: [
                    {
                        id: '64832',
                        description: 'To check whether media is premium or not',
                        name: 'FILTER_ASSET_PREMIUM',
                        type: 'assetFilter',
                        code: null,
                        filterParams: []
                    },
                    {
                        id: '79272',
                        description: 'To inject ad breaks',
                        name: 'FILTER_ASSET_ADINJECT',
                        type: 'assetFilter',
                        code: null,
                        filterParams: []
                    },
                    {
                        id: '65763',
                        description: 'To convert pipelist to applicaster feed',
                        name: 'FILTER_PLAYLIST_JWPLAYER',
                        type: 'playlistFilter',
                        code: null,
                        filterParams: []
                    },
                    {
                        id: '1bab5',
                        description: 'To check authentication',
                        name: 'FILTER_ASSET_NEED_AUTHENTICATION',
                        type: 'customAssetFilter',
                        code: 'item.extensions.requiresAuthentication = true;',
                        filterParams: []
                    },
                    {
                        id: '65963',
                        description: 'To convert media to pipe2 feed',
                        name: 'FILTER_MEDIA_JWPLAYER',
                        type: 'playlistFilter',
                        code: null,
                        filterParams: []
                    },
                ]
            });
            logger.info('Filters seeded successfully!');
        } else {
            logger.info('Filters already exist. Skipping seed.');
        }


        // Check and seed data for Feeds
        const existingFeed = await prisma.feed.findUnique({
            where: { id: '0d40c' }
        });
        if (!existingFeed) {
            await prisma.feed.create({
                data: {
                    id: '0d40c',
                    path: '/tbn/playlist-feed',
                    name: 'Playlist feed',
                    config: {
                        assetFilters: [
                            {
                                name: 'FILTER_ASSET_PREMIUM',
                                type: 'assetFilter',
                                config: {
                                    excludeTags: 'episode, free',
                                    includeProperties: {
                                        requiresSubscription: 'false'
                                    }
                                }
                            },
                            {
                                name: 'FILTER_ASSET_ADINJECT',
                                type: 'assetFilter',
                                config: {
                                    entry: 'id',
                                    includeMidRoll: true,
                                    includePostRoll: true
                                }
                            },
                            {
                                name: 'FILTER_ASSET_NEED_AUTHENTICATION',
                                type: 'customAssetFilter',
                                config: {
                                    clearCache: true
                                }
                            }
                        ],
                        playlistFilters: [
                            {
                                name: 'FILTER_PLAYLIST_JWPLAYER',
                                type: 'playlistFilter',
                                config: {
                                    excludeTags: true,
                                    includeCustomParms: false
                                }
                            }
                        ]
                    },
                    queryParams: [
                        {
                            name: 'playlistId',
                            required: false
                        }
                    ],
                }
            });
            logger.info('Feed seeded successfully!');
        } else {
            logger.info('Feed already exists. Skipping seed.');
        }

        // Check and seed data for adBreaks
        const existingAdBreak = await prisma.adBreaks.findUnique({
            where: { mediaId: 'DqGECHhT' }
        });
        if (!existingAdBreak) {
            await prisma.adBreaks.create({
                data: {
                    mediaId: 'DqGECHhT',
                    markers: [
                        { slot: 2, breaktime: 1649, break_mode: 1 },
                        { slot: 2, breaktime: 112, break_mode: 9 },
                        { slot: 12, breaktime: 112, break_mode: 9 }
                    ]
                }
            });
            logger.info('adBreaks seeded successfully!');
        } else {
            logger.info('adBreaks already exist. Skipping seed.');
        }
        logger.info('Database setup complete. Seed data have been successfully initialized.');
    } catch (error) {
        logger.error(error)
    } finally {
        await prisma.$disconnect();
    }
}

loadSeedData()