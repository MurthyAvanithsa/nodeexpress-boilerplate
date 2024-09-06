import { JsonValue } from "@prisma/client/runtime/library";

export type getAllJobsRequest = {sort: Array<string>, filter: { [key: string]: any }, pagination: Array<number>}

export type getAllJobsResponse = {
    data?: {
        id: string,
        queueName: string,
        jobId: string,       
        status: string,      
        payload: JsonValue,
        createdAt: Date, 
        completedAt: Date | null, 
        error: string | null
    }[],
    error?: string
};

export type getJobByIdResponse = {
    data?: {
        id: string,
        queueName: string,
        jobId: string,       
        status: string,      
        payload: JsonValue,
        createdAt: Date, 
        completedAt: Date | null, 
        error: string | null
    } | null,
    error?: string
};
