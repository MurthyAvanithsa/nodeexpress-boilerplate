import { app } from "../../app";
import request from "supertest";

describe("POST /job", () => {

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
