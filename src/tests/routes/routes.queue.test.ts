import { app } from "../../app";
import request from "supertest";
import { logger } from "../../logger/log";


describe("GET /job", () => {

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
    }),


    it("should return all jobs in queue", async () => {
        const queryParams = {
            sort: JSON.stringify(['id', 'asc']),
            filter: JSON.stringify({ '1': '1' }),
            pagination: JSON.stringify([0, 10])
        };

        const response = await request(app)
            .get("/job")
            .query(queryParams)

        const data = response.body.data;
        expect(response.body).toHaveProperty('data');
        // logger.info(data)
        expect(data?.[0]?.id).toBeDefined()
        expect(data?.[0]?.queueName).toBeDefined()
        expect(data?.[0]?.jobId).toBeDefined()
        expect(data?.[0]?.status).toBeDefined()
        expect(data?.[0]?.payload).toBeDefined()
        expect(data?.[0]?.createdAt).toBeDefined()
        expect(data?.[0]?.completedAt).toBeDefined()
        expect(data?.[0]?.error).toBeDefined()
    });

    it("Should fetch job by ID from queue", async () =>{
        const id = "cm0uy5s9x0000bovrsify8bv3";
        const response = await request(app)
        .get(`/job/${id}`)

        const data = response.body.data
        expect(data?.id).toBeDefined()
        expect(data?.queueName).toBeDefined()
        expect(data?.jobId).toBeDefined()
        expect(data?.status).toBeDefined()
        expect(data?.payload).toBeInstanceOf(Object)
        expect(data?.createdAt).toBeDefined()
        expect(data?.completedAt).toBeDefined()
        expect(data?.error).toBeDefined()

    });


    it("Should return error for fetching a specific job with an invalid ID", async()=>{
        const id = "cvbnmhsjkl6789"
            const response = await request(app)
            .get(`/job/${id}`)    
            expect(response.statusCode).toBe(500)
    })
})
