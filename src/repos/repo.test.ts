import { getAllFilters, getFilterById, createFilter, updateFilter, deleteFilter } from './repos.filter';
import { getFeeds, getFeedById, createFeed, updateFeed, deleteFeed } from './repos.feed';
import { logger } from "../logger/log";

function logTestResult(testName: string, result: any) {
    // logger.info(`Test: ${testName} - Result: ${JSON.stringify(result, null, 2)}`);
}

describe('Filter Repo Functions', () => {
    let filterId: string = "xx123xxx";

    it('should create a new filter', async () => {
        const newFilter = {
            id: filterId,
            name: 'Test Filter1',
            type: 'assetFilter',
            description: 'Test Description',
            filterParams: [],
            code: 'Test Code'
        };

        const createResult = await createFilter(newFilter);
        logTestResult('Create Filter', createResult);

        expect(createResult.data).toBeDefined();
        expect(createResult.data?.name).toBe(newFilter.name);
        expect(createResult.data?.type).toBe(newFilter.type);
        expect(createResult.data?.description).toBe(newFilter.description);
        expect(createResult.data?.code).toBe(newFilter.code);
        expect(createResult.data?.filterParams).toEqual(newFilter.filterParams);

    });

    it('should fetch a filter by ID', async () => {
        const getResult = await getFilterById(filterId);
        logTestResult('Get Filter by ID', getResult);

        expect(getResult.data).toBeDefined();
        expect(getResult.data?.id).toBe(filterId);
    });

    it('should update the filter', async () => {
        const updates = {
            name: 'Updated Filter',
            description: 'Updated Description',
            filterParams: [],
            code: 'Updated Code'
        };

        const updateResult = await updateFilter(filterId, updates);
        logTestResult('Update Filter', updateResult);

        expect(updateResult.data).toBeDefined();
        expect(updateResult.data?.name).toBe(updates.name);
        expect(updateResult.data?.description).toBe(updates.description);
        expect(updateResult.data?.code).toBe(updates.code);
        expect(updateResult.data?.filterParams).toEqual(updates.filterParams);
    });

    it('should delete the filter', async () => {
        const deleteResult = await deleteFilter(filterId);
        logTestResult('Delete Filter', deleteResult);

        expect(deleteResult.data).toBeNull();
    });

    it('should fetch all filters', async () => {
        const allFiltersResult = await getAllFilters();
        logTestResult('Get All Filters', allFiltersResult);

        expect(allFiltersResult.data).toBeInstanceOf(Array);
    });
});

describe('Feed Repo Functions', () => {
    let feedId: string = "xxx123xxx";

    it('should create a new feed', async () => {
        const newFeed = {
            id: feedId,
            path: '/test/path',
            name: 'Test Feed',
            config: { key: 'value' },
            queryParams: [{ name: 'param1', type: 'string', required: true }]
        };

        const createResult = await createFeed(newFeed);
        logTestResult('Create Feed', createResult);

        expect(createResult.data).toBeDefined();
        expect(createResult.data?.name).toBe(newFeed.name);
        expect(createResult.data?.path).toBe(newFeed.path);
        expect(createResult.data?.config).toEqual(newFeed.config);
        expect(createResult.data?.queryParams).toEqual(newFeed.queryParams);

    });

    it('should fetch a feed by ID', async () => {
        const getResult = await getFeedById(feedId);
        logTestResult('Get Feed by ID', getResult);

        expect(getResult.data).toBeDefined();
        expect(getResult.data?.id).toBe(feedId);
    });

    it('should update the feed', async () => {
        const updates = {
            name: 'Updated Feed',
            config: { newKey: 'newValue' },
            queryParams: [{ name: 'param1', type: 'string', required: true }]
        };

        const updateResult = await updateFeed(feedId, updates);
        logTestResult('Update Feed', updateResult);

        expect(updateResult.data).toBeDefined();
        expect(updateResult.data?.name).toBe(updates.name);
        expect(updateResult.data?.config).toEqual(updates.config);
        expect(updateResult.data?.queryParams).toEqual(updates.queryParams);
    });

    it('should delete the feed', async () => {
        const deleteResult = await deleteFeed(feedId);
        logTestResult('Delete Feed', deleteResult);

        expect(deleteResult.data).toBeNull();
    });

    it('should fetch all feeds', async () => {
        const allFeedsResult = await getFeeds();
        logTestResult('Get All Feeds', allFeedsResult);

        expect(allFeedsResult.data).toBeInstanceOf(Array);
    });
});
