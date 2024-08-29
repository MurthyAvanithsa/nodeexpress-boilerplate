import { PrismaClient } from "@prisma/client";
import { logger } from "../logger/log";

export function getPrismaClientInstance(): PrismaClient{
    try {
        return new PrismaClient();
    } catch (error) {
        throw new Error(`Error in creation of prisma client: ${error}`);
    }
}
