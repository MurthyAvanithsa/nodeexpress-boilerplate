export type FeedQueryParams = {
    "name": string,
    "type": string,
    "required": boolean
}

export type Feed = {
    id: number;
    name: string;
    description?: string;
    path: string;
    config: object;
    queryParams: FeedQueryParams[];
};

export type GetFeedsResponse = {
    // data: Feed[];
    data: Omit<Feed, 'config' |'queryParams'>[];
};

export type PostFeedResponse = {
    data: Feed;
};

export type GetFeedResponse = {
    data: Feed;
};

export type UpdateFeedResponse = {
    data: Feed;
};

export type DeleteFeedResponse = {
   data : Pick<Feed, 'id'>;
};

export type PostFeedRequestBody = Omit<Feed, 'id' | 'config'>;
export type UpdateFeedRequestBody = Feed;
