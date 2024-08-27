import { logger } from "../logger/log";
import { getAllFilters, getFilterById, createFilter, updateFilter, deleteFilter } from './repos.filter';
import { getFeeds, getFeedById, createFeed, updateFeed, deleteFeed } from './repos.feed';

function logTestResult(testName: string, result: any) {
    logger.info(`Test: ${testName} - Result: ${JSON.stringify(result, null, 2)}`);
}

async function runTests() {
    try {
        // Feed Repository Tests
        let createdFeedId: string;
        const newFeed = {
            path: '/test/path',
            name: 'Test Feed',
            config: { key: 'value' },
            queryParams: [{ name: 'param1', type: 'string', required: true }]
        };

        logger.info(`Creating feed with path: ${newFeed.path}`);
        const createResult = await createFeed(newFeed);
        logTestResult('Create Feed', createResult);

        if (createResult.data) {
            createdFeedId = createResult.data.id;

            logger.info(`Fetching feed by ID: ${createdFeedId}`);
            const getResult = await getFeedById(createdFeedId);
            logTestResult('Get Feed by ID', getResult);

            const updates = {
                name: 'Updated Feed',
                config: { newKey: 'newValue' },
                queryParams: [{ name: 'param1', type: 'string', required: true }]
            };

            logger.info(`Updating feed with ID: ${createdFeedId}`);
            const updateResult = await updateFeed(createdFeedId, updates);
            logTestResult('Update Feed', updateResult);

            logger.info(`Deleting feed with ID: ${createdFeedId}`);
            const deleteResult = await deleteFeed(createdFeedId);
            logTestResult('Delete Feed', deleteResult);

            logger.info('Fetching all feeds');
            const allFeedsResult = await getFeeds();
            logTestResult('Get All Feeds', allFeedsResult);
        } else {
            logger.error('Failed to create feed');
        }

        // Filter Repository Tests
        const newFilter = {
            name: 'Test Filter1',
            type: 'assetFilter',
            description: 'Test Description',
            filterParams: [],
            code: 'Test Code'
        };

        logger.info('Creating filter...');
        const createFilterResult = await createFilter(newFilter);
        logTestResult('Create Filter', createFilterResult);

        if (createFilterResult.data) {
            const filterId = createFilterResult.data.id;

            logger.info('Fetching filter by ID...');
            const getFilterResult = await getFilterById(filterId);
            logTestResult('Get Filter by ID', getFilterResult);

            const updateFilterData = {
                name: 'Test Filter1',
                type: 'assetFilter',
                description: 'Updated Description',
                filterParams: [],
                code: 'Updated Code'
            };

            logger.info('Updating filter...');
            const updateFilterResult = await updateFilter(filterId, updateFilterData);
            logTestResult('Update Filter', updateFilterResult);

            logger.info('Deleting filter...');
            const deleteFilterResult = await deleteFilter(filterId);
            logTestResult('Delete Filter', deleteFilterResult);

            logger.info('Fetching all filters...');
            const allFiltersResult = await getAllFilters();
            logTestResult('Get All Filters', allFiltersResult);
        } else {
            logger.error('Failed to create filter');
        }

    } catch (error) {
        logger.error(`Error during tests: ${JSON.stringify(error, null, 2)}`);
    }
}

runTests();
