# Microservices-boilerplate

### Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Introduction](#introduction)
- [Swagger Documentation](#swagger-documentation)
- [Overview of Repository Functions](#overview-of-repository-functions)
- [JWT Middleware](#jwt-middleware)
- [Docker Setup](#docker-setup)
- [Roles and Permissions Middleware](#roles-and-permissions-middleware)

# Quick Start

To get started with this project, follow the steps below:

**Initial Setup**:

**Clone Repository**:

```
git clone https://github.com/tecnics-python/dsp-boilerplate
```

**Install Dependencies**:

```
yarn install
```

**Setup Application**
   To setup the application, follow these steps:

```
yarn setup
```

If you run the command `yarn setup` in your project with the provided scripts, the following sequence of commands will be executed, each performing a specific task related to OpenAPI schema generation and database setup.

#### Steps

1. **Generate OpenAPI schemas**:
   - **Command**: `yarn generate-openapi-schemas`
   - This command uses `typeconv` to convert TypeScript types into OpenAPI schemas. The output is saved to the `src/swagger/schemas` directory.

2. **Generate OpenAPI spec**:
   - **Command**: `yarn generate-openapi-spec`
   - This runs a TypeScript script (`openapi-spec-generator.ts`) that generates the OpenAPI specification document based on the schemas from the previous step.

3. **Generate DB URL**:
   - **Command**: `yarn generate-db-url`
   - This runs a TypeScript script (`generateDbUrl.ts`) that generates or modifies the database connection URL based on environment variables or some other logic specific to your project.

4. **Migrate the database**:
   - **Command**: `yarn migrate-db`
   - This command applies any pending Prisma migrations to your database, using the schema defined in `src/prisma/schema.prisma`. After migration, the Prisma client is generated.

5. **Load seed data**:
   - **Command**: `yarn load-seed-data`
   - This script runs a TypeScript file (`seed.ts`) that populates the database with seed data, typically used for initial testing or development.

6. **Initialize the database**:
   - **Command**: `yarn init-db`
   - This combines the previous steps of generating the database URL, migrating the database, and loading the seed data, effectively setting up the database from scratch.

7. **Final setup**:
   - The `yarn setup` command runs all the above commands in sequence, ensuring that both the OpenAPI specifications and the database are properly configured and initialized.

**AWS SQS Setup**

To set up AWS SQS in your application, you will need to copy the following credentials from your AWS account:

- **AWS_ACCOUNT_ID**: Your AWS account ID.
- **AWS_QUEUE_NAME**: The name of your SQS queue.
- **AWS_REGION**: The region where your SQS queue is hosted.
- **AWS_ACCESS_KEY_ID**: Your AWS access key ID.
- **AWS_SECRET_ACCESS_KEY**: Your AWS secret access key.
- **AWS_SESSION_TOKEN**: Your AWS session token (only needed for temporary credentials).

### Steps to Copy Credentials Using AWS Management Console

#### 1. **Go to AWS Management Console**
- Navigate to the [AWS Management Console](https://aws.amazon.com/console/).
- Log in using your AWS credentials.

#### 2. **Generate Keys and Session Tokens**
- After logging in, access the AWS Access Keys option.
- Click on Get Keys to generate a new pair of credentials (Access Key and Secret Key).

#### 3. **Copy Environment Setup Variables**
- After generating the keys, you’ll be presented with an option to **copy** the environment setup variables directly.
- This will look something like:
  - For Linux or Mac:
    ```bash
    export AWS_ACCESS_KEY_ID="your-access-key-id"
    export AWS_SECRET_ACCESS_KEY="your-secret-access-key"
    export AWS_SESSION_TOKEN="your-session-token" # (if applicable)
    export AWS_REGION="your-region"

    And also you need to add these two:
    export AWS_ACCOUNT_ID="your-account-id"
    export AWS_QUEUE_NAME="your-queue-name"
    ```
  - For Windows:
    ```cmd
    set AWS_ACCESS_KEY_ID=your-access-key-id
    set AWS_SECRET_ACCESS_KEY=your-secret-access-key
    set AWS_SESSION_TOKEN=your-session-token # (if applicable)
    set AWS_REGION=your-region

    And also you need to add these two:
    set AWS_ACCOUNT_ID=your-account-id
    set AWS_QUEUE_NAME=your-queue-name
    ```
- Once you have these credentials, you can configure them in your application to interact with AWS SQS.
**Key Points:**
- This method allows you to directly copy ***environment setup variables*** for AWS services, helping with abstraction.
- By exporting these variables, you can use them securely without embedding credentials in your source code.

## **Start the Server**:
To run the application with default port, use the following command:

```
yarn start server
```

**Start the Server with Specific Port**:

```
yarn start -- server [-p PORTNUMBER]
          or
yarn start -- server [--port PORTNUMBER]
```
Example:
```
yarn start -- server -p 5000
```
To start the worker with default queue, use the following command:

```
yarn start worker
```
To start the worker with a custom queue, use the following command:

```
yarn start -- worker [--queue customQueueName]
```
Example:
```
yarn start -- worker --queue ad-breaks-queue
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
yarn typeconv -f ts -t oapi -o src/swagger/schemas src/types/*.ts
```

### Generating OpenAPI Specification

The `openapi-spec-generator.ts` script combines the routes defined in `routes.yaml` with the schemas to produce the `swagger.yaml` file. This file contains the complete OpenAPI specification.

### Post-Install Setup

The schema generation and OpenAPI specification creation are automated to run after installing dependencies. This ensures the documentation is always up-to-date. The following command is executed automatically:

```
yarn typeconv -f ts -t oapi -o src/swagger/schemas src/types/*.ts && yarn ts-node src/swagger/openapi-spec-generator.ts
```

### Manual Update

If you update the types and need to regenerate the documentation, you can manually run the following script defined in `package.json`:

```
yarn generate-openapi-spec
```

This script performs the same actions as the post-install process, regenerating the schemas and OpenAPI specification.

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

### Post-Install Setup
While installing dependencies, models are automatically created in the database, seeding is also done, and the Prisma client is generated.
We can manually set up these things:
- To set up the tables: `yarn prisma migrate dev --schema ./src/prisma/schema.prisma`
- To set up the seeding: `yarn ts-node src/repos/seed.ts`
- To generate the Prisma client: `yarn prisma generate --schema ./src/prisma/schema.prisma`
### DB Folder Structure
```
src/
├── repos/               # Repository functions
│   ├── connection.ts    # Manages database connections
│   ├── repos.feed.ts    # Handles the feed db-operations
│   ├── repos.filter.ts  # Handles the filter db-operations
│   └── repo.test.ts     # Handles tests for all repo functions
├── prisma/              # Prisma ORM related files
│   └── schema.prisma    # Prisma schema file contains models
│   └── migrations/      # Database migration files
└── .env                 # Environment variables file in the root directory contains the database URL
```
### Models Overview
**Feed**: *Includes a unique **id** (cuid), a unique **path**, a **name**, a **config** stored as JSON, and an array of JSON **queryParams**.*

**Filter**: *Features a unique **id** (cuid), a unique **name**, a **description**, a **type**, an optional **code**, and an array of JSON **filterParams** (defaulting to an empty array).*

**adBreaks**: *Identified by a unique **mediaId**, with **markers** stored as JSON.*
### Database Operations
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
  yarn test-repo
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

## JWT Middleware

This module sets up JWT middleware using `express-jwt` to authenticate requests.

### Configuration

- **`secret`**: The secret key used to validate the JWT. In this example, it is set to `'jwt-secret'`.
- **`algorithms`**: The algorithms allowed for the JWT. In this example, it is set to `['HS256']`.

### Usage

#### Token:
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MjQ5MjI2NjIsImV4cCI6MTc1NjQ1ODY2MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.Q5u9b0IsPCdab9w0i5Nk1ns1U3GZG2_XhXOKuo-0p0g
```

To use this token, include it in the `headers` section of your request as follows:

```javascript
Authorization: Bearer <your-token>
```

Replace <your-token> with the actual JWT token provided above. Ensure to use this token for authenticated requests to all routes except /api-docs and /bull-board/ui.

```
In this format:
- The `Authorization` header example is provided in a `javascript` code block.
- The actual JWT token is included directly in the `Authorization` header for clarity and ease of copying.
```

# Docker Setup

Update the NODE_ENV with docker
```
  NODE_ENV="docker"
```
### Docker Compose Setup
This setup uses Docker Compose to manage the application's containers. To run the application using Docker Compose, navigate to the project directory and execute the following command:
```
docker-compose up --build
```

This will set up the application with DB, Redis, and the server.

# Roles and Permissions Middleware

This document explains how the `checkRolesAndPermissions` middleware works for handling **authorization** in your Express.js application. It defines role-based access control for different HTTP methods and routes, allowing users with specific roles or groups to perform actions on specific resources.

## Concepts

1. **Group**: A set of users who share the same permissions (e.g., `grp_viewer`, `grp_editor`, `grp_admin`). These groups map to certain roles, which determine the actions they can perform.

2. **Role**: Defines the permissions or capabilities of a user. Each group is associated with a role (e.g., "viewer," "editor," "admin"). For example:
   - **Viewers** can read resources.
   - **Editors** can read and modify resources.
   - **Admins** have access to all resources.

3. **Permissions**: The allowed HTTP methods and routes that a group can access. Permissions are mapped to specific HTTP methods and paths, or to a wildcard `*_*` that grants all permissions for admin users.

## Role-Permission Mapping (`groupRoleMapping`)

The role-permission mapping defines what actions (HTTP methods and paths) each group is allowed to perform. This is stored in the `groupRoleMapping` object.

## Middleware Workflow

The checkRolesAndPermissions middleware checks if a user (based on their group) has the appropriate permissions to access a particular route.

### Steps:

1. **Extract Group**: The user’s group is identified. In this example, it's hardcoded as "grp_editor", but typically it would be retrieved from the req object (e.g., from req.auth.group).

2. **Check Group Permissions**: The middleware looks up the group's permissions in the groupRoleMapping. If the group doesn't exist, the request is denied.

3. **Admin Check**: If the group has the \*_\* wildcard (like grp_admin), all routes are automatically accessible, and the middleware allows the request to continue (next()).

4. **Path & Method Check**: The middleware constructs a key by combining the HTTP method and request path (e.g., GET_/feed). It checks if this key exists in the group's permissions:
    - If the key exists and the permission is true, the user is allowed to proceed.
    - If not, the user is denied access with a 403 Forbidden response.

This middleware will run before protected routes and ensure that only users with the correct group permissions can access them.

### Key Points

- **Role-based access control**: Permissions are based on roles assigned to groups.
- **Granular control**: Permissions are granted per HTTP method and path, allowing fine-grained access.
- **Admin override**: Admin users have complete access via the wildcard *_*.

### Scenarios

**Viewer Request**:
- A user in the grp_viewer group tries to access GET /feed:id. Since this is allowed in the mapping, the request proceeds.
- If the same user tries to POST /feed, they will be denied.

**Editor Request**:
- A user in the grp_editor group has more permissions. They can POST and PUT to /feed and /filter resources.
- If they attempt to access something outside their permissions (e.g., DELETE /feed), they will be denied.

**Admin Request**:
- A user in the grp_admin group can access any route or resource, regardless of the method or path.

### Error Handling

If a user tries to access a resource they don't have permissions for:
- They receive a 403 Forbidden response with a message: "Forbidden - You do not have the necessary permissions.