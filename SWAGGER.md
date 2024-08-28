# Swagger Documentation

This project uses Swagger for API documentation. The setup involves generating OpenAPI schemas and integrating them into a Swagger specification. Below is an overview of the process:

## Folder Structure

- **`src/swagger/`**: The main folder for Swagger-related files.
  - **`schemas/`**: Contains schema files for filters and feeds.
  - **`routes.yaml`**: Defines the OpenAPI specification for the APIs.
  - **`openapi-spec-generator.ts`**: Script that reads `routes.yaml` and schema files to generate the `swagger.yaml` file.

## Generating Schemas

The schema files in the `schemas/` folder are generated using the `typeconv` module. To generate these files, run the following command:

```
npx typeconv -f ts -t oapi -o src/swagger/schemas src/types/*.ts
```

## Generating OpenAPI Specification

The `openapi-spec-generator.ts` script combines the routes defined in `routes.yaml` with the schemas to produce the `swagger.yaml` file. This file contains the complete OpenAPI specification.

## Post-Install Setup

The schema generation and OpenAPI specification creation are automated to run after installing dependencies. This ensures the documentation is always up-to-date. The following command is executed automatically:

```
npx typeconv -f ts -t oapi -o src/swagger/schemas src/types/*.ts && npx ts-node src/swagger/openapi-spec-generator.ts
```

## Manual Update

If you update the types and need to regenerate the documentation, you can manually run the following script defined in `package.json`:

```
npm run generate-openapi-spec
```

This script performs the same actions as the post-install process, regenerating the schemas and OpenAPI specification.