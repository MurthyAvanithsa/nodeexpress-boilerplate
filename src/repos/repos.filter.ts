import { Filter as filterModel } from "@prisma/client";

import { prismaConnection as prisma } from "../connections";
import { logger } from "../logger/log";
import { FilterParams } from "../types/types.filter";

type Result<T> = {
    data?: T;
    error?: string;
};

async function getAllFilters(): Promise<Result<Pick<filterModel, 'id' | 'name' | 'type'>[]>> {
    const filters = await prisma.filter.findMany({
        select: {
            id: true,
            name: true,
            type: true
        }
    });
    return { data: filters };
}

async function getFilterById(filterId: string): Promise<Result<filterModel>> {
    const filter = await prisma.filter.findUnique({
        where: { id: filterId }
    });
    if (!filter) {
        throw new Error(`Filter with ID ${filterId} not found`);
    }
    return { data: filter };
}

async function createFilter(req: {
    id?: any,
    name: string;
    type: string;
    description: string;
    filterParams: FilterParams[];
    code?: string;
}): Promise<Result<filterModel>> {
    const filter = await prisma.filter.create({
        data: req
    });
    return { data: filter };
}

async function updateFilter(filterId: string, updates: {
    name?: string;
    type?: string;
    description?: string;
    filterParams?: FilterParams[];
    code?: string | null;
}): Promise<Result<filterModel>> {
    const filter = await prisma.filter.update({
        where: { id: filterId },
        data: updates
    });
    return { data: filter };
}

async function deleteFilter(filterId: string): Promise<Result<null>> {
    try {
        await prisma.filter.delete({
            where: { id: filterId }
        });
        return { data: null };
    } catch (error: any) {
        logger.error(`Error deleting filter: ${error}`);
        return { error: error.meta ? error.meta.cause ? error.meta.cause : error : error };
    }
}

export { getAllFilters, getFilterById, createFilter, updateFilter, deleteFilter };
