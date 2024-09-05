import { app } from "../app";
import request from "supertest";

const authToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MjQ5MjI2NjIsImV4cCI6MTc1NjQ1ODY2MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.Q5u9b0IsPCdab9w0i5Nk1ns1U3GZG2_XhXOKuo-0p0g";

describe("Test the feed routes", () => {
    let feedId: string;

    it("Should create a new feed", async () => {
        const newFeed = {
            path: "dojo-pbr/tbn",
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
            path: "dojo-pbr/tbn",
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

    it("Should update a filter using '/filter/:id'", async () => {
        const updateFilter = {
            name: "FILTER_SS",
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
});
