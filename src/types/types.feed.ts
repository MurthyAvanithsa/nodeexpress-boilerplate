import { JsonValue } from "@prisma/client/runtime/library";

export type FeedQueryParams = {
  name: string;
  type: string;
  required: boolean;
};

export type Feed = {
  id: string;
  name: string;
  path: string;
  config: JsonValue;
  queryParams: JsonValue[];
};

type UpdateAndCreateFeedRequest = {
  name: string;
  path: string;
  config: object;
  queryParams: FeedQueryParams[];
};

type DeleteAndGetFeedRequest = {
  id: string;
};

// Responses
export type GetFeedsResponse = {
  data?: {
    id: string;
    name: string;
    path: string;
  }[],
};

export type GetFeedResponse = { data?: Feed };
export type PostFeedResponse = { data?: Feed };
export type UpdateFeedResponse = { data?: Feed };
export type DeleteFeedResponse = { data?: DeleteAndGetFeedRequest };

// Request Bodies
export type PostFeedRequestBody = UpdateAndCreateFeedRequest;
export type UpdateFeedRequestBody = UpdateAndCreateFeedRequest;
export type DeleteFeedRequest = DeleteAndGetFeedRequest;
export type GetFeedByIdRequest = DeleteAndGetFeedRequest;
