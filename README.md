
# Microservices-boilerplate

### Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Introduction](#introduction)
- [Swagger Documentation](#swagger-documentation)
- [Overview of Repository Functions](#overview-of-repository-functions)
- [Routes](#routes-docs)

## Quick Start

To get started with this project, follow the steps below:

**Initial Setup**:

**Clone Repository**:

```
git clone https://github.com/tecnics-python/dsp-boilerplate
```

**Install Dependencies**:

```
npm install
```

**Start the Server**: To run the application

```
npm start server
```

**Start the Server with Specific Port**:

```
npm start -- server [-p PORTNUMBER]
          or
npm start -- server [--port PORTNUMBER]
```

# Features

- **SQL Database**: PostgreSQL object data modeling using Prisma ORM
- **Queue Management**: Job queue processing using BullMQ
- **Command-line Interface**: CLI commands and argument parsing using Commander
- **CSV Parsing**: CSV file processing with `csv-parser`
- **Environment Variables**: Secure configuration management using `dotenv`
- **Error Handling**: Custom error handling with `errors` library
- **Logging**: High-performance logging using `pino`, `pino-http`, and `pino-multi-stream`
- **API Documentation**: API documentation with `swagger-ui-express` and OpenAPI validation using `express-openapi-validator`
- **YAML Parsing**: YAML file processing with `yamljs`
- **Type Conversion**: TypeScript to OpenAPI schema conversion using `typeconv`
- **Testing**: Unit testing with Jest and `ts-jest`
- **TypeScript Support**: TypeScript setup and compilation using `typescript`, `ts-node`, `ts-node-dev`, and `tsup`
- **Build and Deployment**: Build management with `tsup` and file copying with `copyfiles`
- **Database Migrations**: Schema migrations and client generation with Prisma CLI
- **Type Definitions**: TypeScript definitions for Express, Pino, Node.js, Swagger UI, and YAML


## Introduction

- Commanderjs for creating commands
- Expressjs is considered as a REST and API middleware 
- PrismaJS is considered as an ORM layer 
- PINOJS as a logging library

## Swagger Documentation

This project uses Swagger for API documentation. The setup involves generating OpenAPI schemas and integrating them into a Swagger specification. Below is an overview of the process:

### Folder Structure

- **`src/swagger/`**: The main folder for Swagger-related files.
  - **`schemas/`**: Contains schema files for filters and feeds.
  - **`routes.yaml`**: Defines the OpenAPI specification for the APIs.
  - **`openapi-spec-generator.ts`**: Script that reads `routes.yaml` and schema files to generate the `swagger.yaml` file.

### Generating Schemas

The schema files in the `schemas/` folder are generated using the `typeconv` module. To generate these files, run the following command:

```
npx typeconv -f ts -t oapi -o src/swagger/schemas src/types/*.ts
```

### Generating OpenAPI Specification

The `openapi-spec-generator.ts` script combines the routes defined in `routes.yaml` with the schemas to produce the `swagger.yaml` file. This file contains the complete OpenAPI specification.

### Post-Install Setup

The schema generation and OpenAPI specification creation are automated to run after installing dependencies. This ensures the documentation is always up-to-date. The following command is executed automatically:

```
npx typeconv -f ts -t oapi -o src/swagger/schemas src/types/*.ts && npx ts-node src/swagger/openapi-spec-generator.ts
```

### Manual Update

If you update the types and need to regenerate the documentation, you can manually run the following script defined in `package.json`:

```
npm run generate-openapi-spec
```

This script performs the same actions as the post-install process, regenerating the schemas and OpenAPI specification.

## routes docs

## Overview of Repository Functions

This documentation provides an overview of repository and database operations, with a focus on using Prisma ORM.

### Introduction

This document aims to provide a comprehensive guide to repository and database operations, specifically using Prisma ORM with a PostgreSQL relational database.

**Prisma ORM Integration:** Utilizes Prisma ORM for database operations, including migrations and client generation.

**Schema Management:** Handles schema migrations with Prisma, specified in the `./src/prisma/schema.prisma` file.

**Seeding:** Seeds the database with initial data using `src/repos/seed.ts`.

### Prisma ORM Overview

Prisma provides a type-safe database client and a powerful data modeling tool. Key features include:

- **Automatic Type Safety**: Reduces runtime errors by providing type safety.
- **Intuitive Data Modeling**: Easy-to-use schema definition and migrations.
- **Efficient Queries**: Optimized query performance and database access.
  - [Prisma Documentation](https://www.prisma.io/docs/)
  - [Prisma GitHub Repository](https://github.com/prisma/prisma)
  - [Prisma Examples](https://github.com/prisma/prisma-examples)
  - [Prisma Blog](https://www.prisma.io/blog/)

This documentation should help you get started with repository and database operations using Prisma ORM. For more detailed information, refer to the official Prisma documentation and resources.

### Models

- #### Feed

  - **id**: String @id @default(cuid()) `Automatically generates a unique id`
  - **path**: String @unique
  - **name**: String
  - **config**: Json
  - **queryParams**: Json[]

- #### Filter

  - **id**: String @id @default(cuid()) `Automatically generates a unique id`
  - **name**: String @unique
  - **description**: String
  - **type**: String
  - **code**: String?
  - **filterParams**: Json[] @default([])

- #### adBreaks
  - **mediaId**: String @id @unique
  - **markers**: Json

### Getting Started

- **Connect to the database:**

  ```javascript
  import prisma from "../../src/repos/connection";
  ```

- #### Repository Functions

  This boilerplate provides a structured approach to managing database operations through repository functions. Below is an overview of key repository functions:

  - #### Feed

    The `Feed` repository is responsible for managing operations related to the `Feed` model. Key functions include:

    - **`getFeeds()`**: Fetches all feed records from the database.
      - return type:
        ```json
        {
          "data": [
            {
              "id": "string",
              "path": "string",
              "name": "string"
            }
          ]
        }
        ```
    - **`getFeedById(feedId: string)`**: Retrieves a specific feed by its ID.
      - return type:
        ```json
        {
          "data": {
            "id": "string",
            "path": "string",
            "name": "string",
            "config": "JsonValue",
            "queryParams": "JsonValue[]"
          }
        }
        ```
    - **`createFeed(req: { path: string, name: string, config: object, queryParams: FeedQueryParams[] })`**: Creates a new feed record with the specified parameters.
      - return type:
        ```json
        {
          "data": {
            "id": "string",
            "path": "string",
            "name": "string",
            "config": "JsonValue",
            "queryParams": "JsonValue[]"
          }
        }
        ```
    - **`updateFeed(feedId: string, updates: { path?: string, name?: string, config: {}, queryParams: FeedQueryParams[] })`**: Updates an existing feed record by ID.
      - return type:
        ```json
        {
          "data": {
            "id": "string",
            "path": "string",
            "name": "string",
            "config": "JsonValue",
            "queryParams": "JsonValue[]"
          }
        }
        ```
    - **`deleteFeed(feedId: string)`**: Deletes a feed record by ID.
    - return type: If the feed is successfully deleted, then the response is
      ```json
       {
         "data": null
       }
       ```  

      These functions interact with the Prisma ORM to perform the CRUD operations on the `Feed` model, ensuring that all interactions with the database are handled efficiently and consistently.

  - #### Filter

    The `Filter` repository handles operations related to the `Filter` model. Key functions include:

    - **`getFilters()`**: Retrieves all filter records from the database.
    - return type:
      ```json
      {
        "data": [
          {
            "id": "string",
            "name": "string",
            "type": "string",
          }
        ]
      }
      ```
    - **`getFilterById(filterId: string)`**: Retrieves a specific filter by its ID.
    - return type:
      ```json
      {
        "data": {
          "id": "string",
          "name": "string",
          "type": "string",
          "description": "string",
          "code": "string",
          "filterParams": "JsonValue[]"
        }
      }
      ```
    - **`createFilter(req: { name: string, type: string, description?: string, code?: string | null, filterParams: FilterParams[] })`**: Creates a new filter with the provided details.
    - return type:
      ```json
      {
        "data": {
          "id": "string",
          "name": "string",
          "type": "string",
          "description": "string",
          "code": "string",
          "filterParams": "JsonValue[]"
        }
      }
      ```
    - **`updateFilter(filterId: string, updates: { name?: string, type?: string, description?: string, code?: string | null, filterParams: FilterParams[] })`**: Updates an existing filter by ID.
    - return type:
      ```json
      {
        "data": {
          "id": "string",
          "name": "string",
          "type": "string",
          "description": "string",
          "code": "string",
          "filterParams": "JsonValue[]"
        }
      }
      ```
    - **`deleteFilter(filterId: string)`**: Deletes a filter by ID.
    - return type: If the filter is successfully deleted, then the response is
      ```json
       {
         "data": null
       }
       ```

    - **Note**: All return types are success types. If the operation fails, the return type is an error type.
      These repository functions ensure that the `Filter` model is managed effectively, enabling precise filtering capabilities within your application.

- #### Usage

  To understand the usage of `feed` and `filter` functions in the repository, refer to the test cases provided in `src/repos/repo.test.ts`.

  To execute the tests for the repository functions, run the following command in your terminal:

  ```
  npm run test-repo
  ```

  The `repo` function returns an object with the following structure:

  - **Success**: When the operation is successful, the function returns an object containing the data.

    ```json
    {
      "data": <T>
    }
    ```

    Here, `T` represents the type of the operation being returned (template type).

  - **Failure**: When the operation fails, the function returns an object containing an error message.
    ```json
    {
      "error": "string"
    }
    ```
    The `error` field contains a string describing the error that occurred.
