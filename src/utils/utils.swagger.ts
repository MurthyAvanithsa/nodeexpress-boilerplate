import path from "path";
import fs from "fs";

import swaggerUi from 'swagger-ui-express';
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
    logger.error(`Error reading or parsing ${filePath}:`, e);
    throw e;
  }
}
export const generateOpenApiSpec = (): boolean => {
  try {
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
    return true;
  } catch (error) {
    logger.error(`Failed to generate openAPI spec: ${error}`)
    return false;
  }
}

function generateSwaggerUiInstance(openApiSpecPath: string) {
  const swaggerDocument = readYamlFile(openApiSpecPath);
  const swaggerOptions = {
    customJs: "/customUi.js",
    customSiteTitle: "Microservices Boilerplate API Docs",
  };
  return swaggerUi.setup(swaggerDocument, swaggerOptions);
}
export const openApiSpecPath: string = path.join(__dirname, "../swagger/swagger.yaml");
export const swaggerUiInstance = generateSwaggerUiInstance(openApiSpecPath);