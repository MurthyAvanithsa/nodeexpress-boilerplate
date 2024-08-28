import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { logger } from '../logger/log';

type OpenApiDocument = {
  components?: {
    schemas?: Record<string, any>;
    [key: string]: any;
  };
  [key: string]: any;
};

function readYamlFile(filePath: string): OpenApiDocument {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContents) as OpenApiDocument;
  } catch (e) {
    console.error(`Error reading or parsing ${filePath}:`, e);
    throw e;
  }
}

const routesYaml = readYamlFile('./src/swagger/routes.yaml');
const feedSchemasYaml = readYamlFile('./src/swagger/schemas/types.feed.yaml');
const filterSchemasYaml = readYamlFile('./src/swagger/schemas/types.filter.yaml');

const swaggerDocument: OpenApiDocument = {
  ...routesYaml,
  components: {
    ...(routesYaml.components || {}),
    schemas: {
      ...(routesYaml.components?.schemas || {}),
      ...(feedSchemasYaml.components?.schemas || {}),
      ...(filterSchemasYaml.components?.schemas || {})
    }
  }
};

const swaggerYaml = yaml.dump(swaggerDocument);
fs.writeFileSync('./src/swagger/swagger.yaml', swaggerYaml);
logger.info('Openapi Spec generated successfully');