import request from "supertest";

import { app } from "../app";

const authToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MjQ5MjI2NjIsImV4cCI6MTc1NjQ1ODY2MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.Q5u9b0IsPCdab9w0i5Nk1ns1U3GZG2_XhXOKuo-0p0g";

describe("Test the feed routes", () => {
    let feedId: string;

    it("Should create a new feed", async () => {
        const newFeed = {
            path: "dojo-pbr/",
            name: "dsp",
            config: {"assetFilters": [], "playlistFilters": []},
            queryParams: []
        };
        const response = await request(app)
            .post("/feed")
            .set("Authorization", authToken)
            .send(newFeed);
        expect(response.body.data).toBeInstanceOf(Object);
        const data = response.body.data;
        feedId = data?.id;
        expect(data).toBeInstanceOf(Object);
        expect(data?.id).toBeDefined();
        expect(data?.name).toBe(newFeed.name);
        expect(data?.path).toBe(newFeed.path);
        expect(data?.config).toEqual(newFeed.config);
        expect(data?.queryParams).toEqual(newFeed.queryParams);
    });

    it("Should fetch all feed data using '/feed'", async () => {
        const response = await request(app)
            .get("/feed")
            .set("Authorization", authToken);
        const data = response.body.data;
        expect(data).toBeInstanceOf(Array);
        expect(data?.[0]?.id).toBeDefined();
        expect(data?.[0]?.name).toBeDefined();
        expect(data?.[0]?.path).toBeDefined();
    });

    it("Should fetch feed by ID using '/feed/:id'", async () => {
        const response = await request(app)
            .get(`/feed/${feedId}`)
            .set("Authorization", authToken);
        expect(response.body.data).toBeInstanceOf(Object);
        const data = response.body.data;
        expect(data?.id).toBeDefined();
        expect(data?.name).toBeDefined();
        expect(data?.path).toBeDefined();
        expect(data?.config).toBeDefined();
        expect(data?.queryParams).toBeDefined();
    });

    it("Should update feed based on ID", async () => {
        const updateFeed = {
            path: "dojo-pbr/",
            name: "dsp",
            config: {"assetFilters": [], "playlistFilters": []},
            queryParams: []
        };
        const response = await request(app)
            .put(`/feed/${feedId}`)
            .set("Authorization", authToken)
            .send(updateFeed);
        expect(response.body.data).toBeInstanceOf(Object);
        const data = response.body.data;
        expect(data).toBeInstanceOf(Object);
        expect(data?.id).toBeDefined();
        expect(data?.name).toBe(updateFeed.name);
        expect(data?.path).toBe(updateFeed.path);
        expect(data?.config).toEqual(updateFeed.config);
        expect(data?.queryParams).toEqual(updateFeed.queryParams);
    });

    it("Should delete feed by ID using '/feed/:id'", async () => {
        const response = await request(app)
            .delete(`/feed/${feedId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(204);
    });

    // let feedId = "cm0unzfea0000yf10u8eohrti"
    it("should return error for fetching all feeds with invalid token", async() =>{
        const response = await request(app)
        .get('/feed')
        .set("Authorization", "Bearer 345678dfghjo");
        expect(response.status).toBe(401);
    });

    it("should return error for creating a new feed with invalid token", async() =>{
        const createFeed = {
            path: "dojo-pbr/tbn",
            name: "dsp",
            config: {"assetFilters": [], "playlistFilters": []},
            queryParams: []
            };
            const response = await request(app)
            .post('/feed')
            .set("Authorization", "Bearer 342r3f3wrrfc3333dd")
            .send(createFeed);
            expect(response.status).toBe(401);
    });

    it("should return validation error for creating a feed with missing required fields", async() =>{
        const createFeed = {
            path: "dojo-pbr/tbn",
            config: {"assetFilters": [], "playlistFilters": []},
            queryParams: []
            };
            const response = await request(app)
            .post('/feed')
            .set("Authorization", authToken)
            .send(createFeed);
            expect(response.status).toBe(400);
    });

    it("should return error for fetching a specific feed with an invalid invalid token ", async () => {
        const response = await request(app)
            .get(`/feed/${feedId}`)
            .set("Authorization", 'Bearer 467389tyeuwioqc');
        expect(response.status).toBe(401);
    });

    it("Should return an ID not found message for fetching a feed with an invalid ID.", async () => {
        feedId = "64377tesyw2r"
        const response = await request(app)
            .get(`/feed/${feedId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(404);
    });


    it("Should return validation error for updating a feed with invalid token", async () => {

        const updateFeed = {
            path: "dojo-pbr/tbn",
            name: "dsp",
            config: { "assetFilters": [], "playlistFilters": [] },
            queryParams: []
        };
        const response = await request(app)
            .put(`/feed/${feedId}`)
            .set("Authorization", "Bearer 7890dfghjk")
            .send(updateFeed);
        expect(response.status).toBe(401);
    });

    it("Should return validation error for updating a feed with invalid data", async () => {
        const updateFeed = {
            path: "dojo-pbr/tbn"
        };
        const response = await request(app)
            .put(`/feed/${feedId}`)
            .set("Authorization", authToken)
            .send(updateFeed);
        expect(response.status).toBe(400);
    });

    it("Should return an ID not found message for updating a feed with an invalid ID.", async () => {
        feedId = "536dyusioepeww"
        const response = await request(app)
            .get(`/feed/${feedId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(404);
    });

    it("Should return error for deleting a feed with an invalid token", async () =>{
        const response = await request(app)
        .delete(`/feed/${feedId}`)
        .set("Authorization", "Bearer 56789yuio");
        expect(response.status).toBe(401);
    });

    it("Should return an ID not found message for deleting a feed with an invalid ID.", async () => {
        feedId = "485hdcdw"
        const response = await request(app)
            .get(`/feed/${feedId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(404);
    });

});


describe("Test the filter routes", () => {
    let filterId: string;

    it("Should create a filter using '/filter'", async () => {
        const newFilter = {
            name: "FILTER_GEO_LOCATION",
            description: "This filter is to authenticate user",
            type: "assetFilter",
            code: "",
            filterParams: [{ name: "value", type: "string", required: true }]
        };
        const response = await request(app)
            .post("/filter")
            .set("Authorization", authToken)
            .send(newFilter);
        const data = response.body.data;
        filterId = data?.id;
        expect(data).toBeInstanceOf(Object);
        expect(data?.id).toBeDefined();
        expect(data?.name).toBe(newFilter.name);
        expect(data?.description).toBe(newFilter.description);
        expect(data?.type).toBe(newFilter.type);
        expect(data?.filterParams).toEqual(newFilter.filterParams);
    });

    it("Should fetch all filters using '/filter'", async () => {
        const response = await request(app)
            .get("/filter")
            .set("Authorization", authToken);
        const data = response.body.data;
        expect(data).toBeInstanceOf(Array);
        expect(data?.[0]?.id).toBeDefined();
        expect(data?.[0]?.name).toBeDefined();
        expect(data?.[0]?.type).toBeDefined();
    });

    it("Should fetch filter by ID using '/filter/:id'", async () => {
        const response = await request(app)
            .get(`/filter/${filterId}`)
            .set("Authorization", authToken);
        expect(response.body.data).toBeInstanceOf(Object);
        const data = response.body.data;
        expect(data?.id).toBeDefined();
        expect(data?.name).toBeDefined();
        expect(data?.description).toBeDefined();
        expect(data?.type).toBeDefined();
        expect(data?.code).toBeDefined();
        expect(data?.filterParams).toBeInstanceOf(Array);
    });

    it("Should update a filterby ID using '/filter/:id'", async () => {
        const updateFilter = {
                name: "FILTER_GEO_LOCATION",
                description: "This filter is to authenticate user",
                type: "assetFilter",
                code: "",
                filterParams: [{ name: "value", type: "string", required: true }]
            };
        const response = await request(app)
            .put(`/filter/${filterId}`)
            .set("Authorization", authToken)
            .send(updateFilter);
        expect(response.body).toHaveProperty("data");
        expect(response.body?.data).toBeDefined();
        const data = response.body.data;
        expect(data?.id).toBeDefined();
        expect(data?.name).toBe(updateFilter.name);
        expect(data?.description).toBe(updateFilter.description);
        expect(data?.type).toBe(updateFilter.type);
        expect(data?.filterParams).toEqual(updateFilter.filterParams);
    });

    it("Should delete filter by ID using '/filter/:id'", async () => {
        const response = await request(app)
            .delete(`/filter/${filterId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(204);
    });

    it("Should return error for fetching all filters with invalid token", async() =>{
        const response = await request(app)
        .get('/filter')
        .set("Authorization", "Bearer 647382ghew");
        expect(response.status).toBe(401);
    });

    it("Should return error for creating a new filter with invalid token", async() =>{
        const createFilter = {
                        name: "FILTER_GEO_LOCATION",
                        description: "This filter is to authenticate user",
                        type: "assetFilter",
                        code: "",
                        filterParams: [{ name: "value", type: "string", required: true }]
                    }
            const response = await request(app)
            .post('/filter')
            .set("Authorization", "Bearer 6574839gfjh")
            .send(createFilter);
            expect(response.status).toBe(401);
    });

    it("should return validation error for creating a filter with missing required fields", async() =>{
        const createFilter ={
                        name: "FILTER_GEO_LOCATION",
                        description: "This filter is to authenticate user",
                        type: "assetFilter",
                        // code is missing
                        filterParams: [{ name: "value", type: "string", required: true }]
                    }
            const response = await request(app)
            .post('/filter')
            .set("Authorization", authToken)
            .send(createFilter);
            expect(response.status).toBe(400);
    });

    it("Should return error for fetching a specific filter with an invalid token ", async () => {
        const response = await request(app)
            .get(`/filter/${filterId}`)
            .set("Authorization", 'Bearer 86365fdghsj');
        expect(response.status).toBe(401);
    });

    it("Should return an ID not found message for fetching a filter with an invalid ID.", async () => {
        filterId = "78376";
        const response = await request(app)
            .get(`/filter/${filterId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(404);
    });


    it("Should return validation error for updating a filter with invalid token", async () => {

        const updateFilter = {
                        name: "FILTER_SS",
                        description: "This filter is to authenticate user",
                        type: "assetFilter",
                        code: "",
                        filterParams: [{ name: "value", type: "string", required: true }]
                    };
        const response = await request(app)
            .put(`/filter/${filterId}`)
            .set("Authorization", "Bearer 75843rekcjskf34")
            .send(updateFilter);
        expect(response.status).toBe(401);
    });

    it("Should return validation error for updating a filter with invalid data", async () => {
        const updateFilter = {
                        name: "FILTER_GEO_LOCATION",
                        description: "This filter is to authenticate user",
                        // type is missing
                        code: "",
                        filterParams: [{ name: "value", type: "string", required: true }]
                    }
        const response = await request(app)
            .put(`/filter/${filterId}`)
            .set("Authorization", authToken)
            .send(updateFilter);
        expect(response.status).toBe(400);
    });

    it("Should return an ID not found message for updating a filter with an invalid ID.", async () => {
        filterId = "r5679";
        const response = await request(app)
            .get(`/filter/${filterId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(404);
    });

    it("Should return error for deleting a filter with an invalid token", async () =>{
        const response = await request(app)
        .delete(`/filter/${filterId}`)
        .set("Authorization", "Bearer 6473892uisoaksxe");
        expect(response.status).toBe(401);
    });

    it("Should return an ID not found message for deleting a filter with an invalid ID.", async () => {
        filterId = "r5679";
        const response = await request(app)
            .get(`/filter/${filterId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(404);
    })


});

describe("Test the queue routes", () => {

    it("Should create a new job", async() => {
        const newJob = {
                data: {
                    msg: "Testing 7"
                }
            }
        const response = await request(app)
        .post("/job")
        .send(newJob)

        expect(response.status).toBe(201);
    })
})
