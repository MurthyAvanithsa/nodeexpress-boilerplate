import { logger } from "../logger/log";
import { getAllFilters, getFilterById, createFilter, updateFilter, deleteFilter } from './repos.filter';

async function testFilterFunctions() {
    try {
        // Test createFilter
        const newFilter = {
            name: 'Test Filter1',
            type: 'assetFilter',
            description: 'Test Description',
            filterParams: [],
            code: 'Test Code'
        };

        logger.info('Creating filter...');
        const createResult = await createFilter(newFilter);
        logger.info(`Create result: ${JSON.stringify(createResult)}`);

        if (createResult.data) {
            const filterId = createResult.data.id;

            // Test getFilterById
            logger.info('Fetching filter by ID...');
            const getResult = await getFilterById(filterId);
            logger.info(`Get result: ${JSON.stringify(getResult)}`);

            // Test updateFilter
            logger.info('Updating filter...');
            const updateResult = await updateFilter(filterId, {
                name: 'Test Filter1',
                type: 'assetFilter',
                description: 'Updated Description',
                filterParams: [], // Adjust this to match your filterParams type
                code: 'Updated Code'
            });
            logger.info(`Update result: ${JSON.stringify(updateResult)}`);

            // Test deleteFilter
            logger.info('Deleting filter...');
            const deleteResult = await deleteFilter(filterId); // Make sure to pass a valid filterId
            logger.info(`Delete result: ${JSON.stringify(deleteResult)}`);

            // Test getAllFilters
            logger.info('Fetching all filters...');
            const allFiltersResult = await getAllFilters();
            logger.info(`All filters result: ${JSON.stringify(allFiltersResult)}`);
        } else {
            logger.error('Failed to create filter');
        }
    } catch (error) {
        logger.error(`Error during testing: ${JSON.stringify(error)}`);
    }
}

testFilterFunctions();
