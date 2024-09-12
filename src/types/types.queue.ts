import { JsonValue } from "@prisma/client/runtime/library";
import { CloudEventV1 } from "cloudevents";

export type getAllJobsRequest = { sort: Array<string>, filter: { [key: string]: any }, pagination: Array<number> }

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

export type postMessageResponse = {
    error?: any,
    data?: { messageId?: string, payload: CloudEventV1<JSON> },
    status: boolean
}