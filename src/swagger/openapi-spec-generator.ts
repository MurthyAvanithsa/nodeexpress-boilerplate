import { generateOpenApiSpec } from "../utils/utils.swagger";
import { logger } from "../logger/log";

const isGenerated: boolean = generateOpenApiSpec();

if (isGenerated) {
    logger.info("OpenAPI spec generated successfully!");
}