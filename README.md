
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

### Feed Routes

#### Endpoint: `/feed`

#### Method: `GET`

#### Description
Fetches all feeds data.

#### Responses

##### 200 OK
- **Description**: Successfully retrieved feed data.
- **Example**:
  ```json
  {
    "data": [
      {
        "id": "0d40c",
        "name": "Playlist feed",
        "path": "/tbn/playlist-feed"
      },
      {
        "id": "cm0drew770000onf86e8j91bs",
        "name": "Playlist",
        "path": "/tbn/mediafeed"
      },
      {
        "id": "example-id",
        "name": "Another feed",
        "path": "/tbn/another-feed"
      }
    ]
  }

##### 500 Internal Server Error
- **Description**: An error occurred while fetching feed data.
- **Example**:
    ```json
    {
      "error": "Error message"
    }
    ```


#### Endpoint: `/filter/:id`

#### Method: `GET`

#### URL Parameters
- **id** (string): The ID of the filter to retrieve.

#### Responses

##### 200 OK
- **Description**: Successfully retrieved the filter.
- **Example**:
  ```json
  {
    "data": {
      "id": "0d40c",
      "path": "/tbn/playlist-feed",
      "name": "Playlist feed",
      "config": {
        "assetFilters": [
          {
            "name": "FILTER_ASSET_PREMIUM",
            "type": "assetFilter",
            "config": {
              "excludeTags": "episode, free",
              "includeProperties": {
                "requiresSubscription": "false"
              }
            }
          },
          {
            "name": "FILTER_ASSET_ADINJECT",
            "type": "assetFilter",
            "config": {
              "entry": "id",
              "includeMidRoll": true,
              "includePostRoll": true
            }
          },
          {
            "name": "FILTER_ASSET_NEED_AUTHENTICATION",
            "type": "customAssetFilter",
            "config": {
              "clearCache": true
            }
          }
        ],
        "playlistFilters": [
          {
            "name": "FILTER_PLAYLIST_JWPLAYER",
            "type": "playlistFilter",
            "config": {
              "excludeTags": true,
              "includeCustomParms": false
            }
          }
        ]
      },
      "queryParams": [
        {
          "name": "playlistId",
          "required": false
        }
      ]
    }
  }
  ```

##### 404 Not Found
- **Description**: The specified filter could not be found. This response indicates that the ID provided does not match any filter in the system.
- **Example**:
  ```json
  {
    "error": "error message"
  }

##### 500 Internal Server Error
- **Description**: An error occurred while fetching the filter. 
- **Example**:
  ```json
  {
    "error": "error message"
  }


#### Endpoint: `/feed`

#### Method: `POST`

#### Description
Creates a new feed.

#### Request Body

- `PostFeedRequestBody`
  - **Description**: The request body should contain the details of the feed to be created.
  - **Example**:
    ```json
    {
      "path": "/tbn/dojo-pbr",
      "name": "Playlist feed",
      "config": {
        "assetFilters": [
          {
            "name": "FILTER_ASSET_PREMIUM",
            "type": "assetFilter",
            "config": {
              "excludeTags": "episode, free",
              "includeProperties": {
                "requiresSubscription": "false"
              }
            }
          },
          {
            "name": "FILTER_ASSET_ADINJECT",
            "type": "assetFilter",
            "config": {
              "entry": "id",
              "includeMidRoll": true,
              "includePostRoll": true
            }
          },
          {
            "name": "FILTER_ASSET_NEED_AUTHENTICATION",
            "type": "customAssetFilter",
            "config": {
              "clearCache": true
            }
          }
        ],
        "playlistFilters": [
          {
            "name": "FILTER_PLAYLIST_JWPLAYER",
            "type": "playlistFilter",
            "config": {
              "excludeTags": true,
              "includeCustomParms": false
            }
          }
        ]
      },
      "queryParams": [
        {
          "name": "playlistId",
          "type": "string",
          "required": false
        }
      ]
    }
    ```

#### Responses

##### 201 Created
- **Description**: The feed was successfully created.
- **Example**:
  ```json
  {
    "data": {
      "id": "cm0f29z2g0001qjb28qxs68iq",
      "path": "/tbn/dojo-pbr",
      "name": "Playlist feed",
      "config": {
        "assetFilters": [
          {
            "name": "FILTER_ASSET_PREMIUM",
            "type": "assetFilter",
            "config": {
              "excludeTags": "episode, free",
              "includeProperties": {
                "requiresSubscription": "false"
              }
            }
          },
          {
            "name": "FILTER_ASSET_ADINJECT",
            "type": "assetFilter",
            "config": {
              "entry": "id",
              "includeMidRoll": true,
              "includePostRoll": true
            }
          },
          {
            "name": "FILTER_ASSET_NEED_AUTHENTICATION",
            "type": "customAssetFilter",
            "config": {
              "clearCache": true
            }
          }
        ],
        "playlistFilters": [
          {
            "name": "FILTER_PLAYLIST_JWPLAYER",
            "type": "playlistFilter",
            "config": {
              "excludeTags": true,
              "includeCustomParms": false
            }
          }
        ]
      },
      "queryParams": [
        {
          "name": "playlistId",
          "type": "string",
          "required": false
        }
      ]
    }
  }

##### 500 Internal Server Error
- **Description**: An error occurred while fetching the filter. 
- **Example**:
  ```json
  {
    "error": "error message"
  }
  ```


#### Endpoint: `/feed/:id`
  
#### Method: `PUT`
  
#### Description
  Up dates the feed information based on the provided feed ID.
  
#### Parameters
  - `id` (path parameter): The ID of the feed to be updated.
  
#### Request Body
  
- **UpdateFeedRequestBody**:
  - **Description**: The body containing the new feed information.
  - **Example**:
    ```json
    {
      "path": "/tbn/dojo-pbr",
      "name": "Playlist feed",
      "config": {
        "assetFilters": [
          {
            "name": "FILTER_ASSET_PREMIUM",
            "type": "assetFilter",
            "config": {
              "excludeTags": "episode, free",
              "includeProperties": {
                "requiresSubscription": "false"
              }
            }
          },
          {
            "name": "FILTER_ASSET_ADINJECT",
            "type": "assetFilter",
            "config": {
              "entry": "id",
              "includeMidRoll": true,
              "includePostRoll": true
            }
          },
          {
            "name": "FILTER_ASSET_NEED_AUTHENTICATION",
            "type": "customAssetFilter",
            "config": {
              "clearCache": true
            }
          }
        ],
        "playlistFilters": [
          {
            "name": "FILTER_PLAYLIST_JWPLAYER",
            "type": "playlistFilter",
            "config": {
              "excludeTags": true,
              "includeCustomParms": false
            }
          }
        ]
      },
      "queryParams": [
        {
          "name": "playlistId",
          "type": "string",
          "required": false
        }
      ]
    }
    ```
  
#### Responses
  
##### 200 OK
- **Description**: The feed was successfully updated.
- **Example**:
  ```json
      {
        "data": {
          "id": "cm0f29z2g0001qjb28qxs68iq",
          "path": "/tbn/dojo-pbr",
          "name": "Playlist feed",
          "config": {
            "assetFilters": [
              {
                "name": "FILTER_ASSET_PREMIUM",
                "type": "assetFilter",
                "config": {
                  "excludeTags": "episode, free",
                  "includeProperties": {
                    "requiresSubscription": "false"
                  }
                }
              },
              {
                "name": "FILTER_ASSET_ADINJECT",
                "type": "assetFilter",
                "config": {
                  "entry": "id",
                  "includeMidRoll": true,
                  "includePostRoll": true
                }
              },
              {
                "name": "FILTER_ASSET_NEED_AUTHENTICATION",
                "type": "customAssetFilter",
                "config": {
                  "clearCache": true
                }
              }
            ],
            "playlistFilters": [
              {
                "name": "FILTER_PLAYLIST_JWPLAYER",
                "type": "playlistFilter",
                "config": {
                  "excludeTags": true,
                  "includeCustomParms": false
                }
              }
            ]
          },
          "queryParams": [
            {
              "name": "playlistId",
              "type": "string",
              "required": false
            }
          ]
        }
      }
  ```
  
##### 500 Internal Server Error
- **Description**: An error occurred while updating the feed.
- **Example**:
    ```json
    {
    "error": "error message"
    }
    ```


#### Endpoint: `DELETE /feed/:id`

#### Method: `DELETE`

#### Parameters
- `id` (string, required): The unique identifier of the feed to be deleted.

#### Responses

##### 204 No Content
  - **Description**: The feed was successfully deleted.

#### 500 Internal Server Error
  - **Description**: An error occurred while deleting the feed.
  - **Example**:
    ```json
    {
      "error": "Error message"
    }
    ```


### Filter Routes

#### Endpoint: `/filter/`

#### Description
Fetches all filters.

#### Method: `GET`

#### Responses

##### 200 OK
- **Description**: Successfully retrieved all filters.
- **Example**:
  ```json
  {
    "data": [
      {
        "id": "79272",
        "name": "FILTER_ASSET_ADINJECT",
        "type": "assetFilter"
      },
      {
        "id": "65763",
        "name": "FILTER_PLAYLIST_JWPLAYER",
        "type": "playlistFilter"
      },
      {
        "id": "12345",
        "name": "FILTER_SOME_OTHER",
        "type": "otherFilter"
      }
    ]
  }

##### 500 Internal Server Error
- **Description**: An error occurred while fetching filters.
- **Example**:
  ```json
  {
    "error": "Error message"
  }


#### Endpoint: `/filter/:id`

#### Description
Fetches a specific filter by its ID.

#### Method: `GET`

#### URL Parameters
- `id` (string): The ID of the filter to retrieve.

#### Response

##### 200 OK
- **Description**: Successfully retrieved the filter.
- **Example**:
  ```json
  {
    "data": {
      "id": "79272",
      "name": "FILTER_ASSET_ADINJECT",
      "description": "To inject ad breaks",
      "type": "assetFilter",
      "code": null,
      "filterParams": []
    }
  }

##### 404 Not Found
- **Description**: The requested filter could not be found.
- **Example**:
  ```json
  {
    "error": "error message"
  }

##### 500 Internal Server Error
- **Description**: An error occurred while fetching the filter.
- **Example**:
  ```json
  {
    "error": "error message"
  }


#### Endpoint: `/filter/`

#### Description
Creates a new filter.

#### Method: `POST`

#### Request Body

- **CreateFilterRequest**:
  - **Description**: The body containing the new filter information.
  - **Example**:
    ```json
    {
      "name": "FILTER_GEO_LOCATION",
      "description": "To add geo location to each playlist",
      "type": "assetFilter",
      "code": "",
      "filterParams": []
    }
    ```

#### Responses

##### 201 Created
- **Description**: The filter was successfully created.
- **Example**:
  ```json
  {
    "data": {
      "id": "cm0f1zt570000qjb2z76lx189",
      "name": "FILTER_GEO_LOCATION",
      "description": "To add geo location to each playlist",
      "type": "assetFilter",
      "code": null,
      "filterParams": []
    }
  }

##### 500 Internal Server Error
- **Description**: An error occurred while creating the filter.
- **Example**:
  ```json
  {
    "error": "error message"
  }



#### Endpoint: `/filter/:id`

#### Description
Updates an existing filter with the specified ID.

#### Method: `POST`

#### URL Parameters
- `id` (string, required): The unique identifier of the filter to be updated.

#### Request Body

- **CreateFilterRequest**:
  - **Description**: The body containing the updated filter information.
  - **Example**:
    ```json
    {
      "name": "FILTER_GEO_LOCATION",
      "description": "To add geo location to each playlist",
      "type": "assetFilter",
      "code": "",
      "filterParams": []
    }
    ```

#### Responses

##### 201 Created
- **Description**: The filter was successfully updated.
- **Example**:
  ```json
  {
    "data": {
      "id": "cm0f1zt570000qjb2z76lx189",
      "name": "FILTER_GEO_LOCATION",
      "description": "To add geo location to each playlist",
      "type": "assetFilter",
      "code": null,
      "filterParams": []
    }
  }

##### 500 Internal Server Error
- **Description**: An error occurred while updating the filter.
- **Example**:
  ```json
  {
    "error": "error message"
  }


#### Endpoint: `/feed/:id`

#### Description
Deletes a filter by its ID.

### Method: `DELETE`

#### Parameters
- **id** (string, required): The unique identifier of the filter to be deleted.

#### Responses

##### 204 No Content
- **Description**: The filter was successfully deleted.

##### 500 Internal Server Error
- **Description**: An error occurred while deleting the filter.
- **Example**:
  ```json
  {
    "error": "An error occurred while deleting the filter"
  }


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
- To set up the tables: `npx prisma migrate dev --schema ./src/prisma/schema.prisma`
- To set up the seeding: `npx ts-node src/repos/seed.ts`
- To generate the Prisma client: `npx prisma generate --schema ./src/prisma/schema.prisma`
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
