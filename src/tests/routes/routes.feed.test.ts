<<<<<<< HEAD:src/tests/routes/routes.feed.test.ts
import { app } from "../../app";
=======
>>>>>>> 64e417c (Modified imports order using eslint fix):src/tests/routes.test.ts
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

});



describe("Validate error response for feed routes", () =>{
    let feedId = "cm0unzfea0000yf10u8eohrti"
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

    it("should return error for fetching a specific feed with an invalid ID", async () => {
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

    it("hould return validation error for updating a feed with invalid data", async () => {
        const updateFeed = {
            path: "dojo-pbr/tbn"
        };
        const response = await request(app)
            .put(`/feed/${feedId}`) 
            .set("Authorization", authToken) 
            .send(updateFeed);
        expect(response.status).toBe(400); 
    });
    
    it("Should return 404 Not Found when updating feed by non-existent ID", async () => {
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

    it("Should return error for deleting a feed with an invalid ID", async () => {
        feedId = "485hdcdw" 
        const response = await request(app)
            .get(`/feed/${feedId}`)
            .set("Authorization", authToken);
        expect(response.status).toBe(404); 
    });

})