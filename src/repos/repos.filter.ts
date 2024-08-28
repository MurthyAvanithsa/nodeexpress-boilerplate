import { prisma } from "./connection";
import { Filter as filterModel } from "@prisma/client";
import { logger } from "../logger/log";
import { FilterParams } from "../types/types.filter";

type Result<T> = {
    data?: T;
    error?: string;
};

async function getAllFilters(): Promise<Result<Pick<filterModel, 'id' | 'name' | 'type'>[]>> {
    try {
        const filters = await prisma.filter.findMany({
            select: {
                id: true,
                name: true,
                type: true
            }
        });
        return { data: filters };
    } catch (error) {
        logger.error(`Error fetching filters:${error}`);
        return { error: "Could not fetch filters" };
    }
}

async function getFilterById(filterId: string): Promise<Result<filterModel>> {
    try {
        const filter = await prisma.filter.findUnique({
            where: { id: filterId }
        });
        if (!filter) {
            return { error: 'Filter not found' };
        }
        return { data: filter };
    } catch (error) {
        logger.error(`Error fetching filter by ID: ${error}`);
        return { error: "Could not fetch filter" };
    }
}

async function createFilter(req: {
    id?: any,
    name: string;
    type: string;
    description: string;
    filterParams: FilterParams[];
    code?: string;
}): Promise<Result<filterModel>> {
    try {
        const filter = await prisma.filter.create({
            data: req
        });
        return { data: filter };
    } catch (error) {
        logger.error(`Error creating filter: ${error}`);
        return { error: "Could not create filter" };
    }
}

async function updateFilter(filterId: string, updates: {
    name?: string;
    type?: string;
    description?: string;
    filterParams?: FilterParams[];
    code?: string | null;
}): Promise<Result<filterModel>> {
    try {
        const filter = await prisma.filter.update({
            where: { id: filterId },
            data: updates
        });
        return { data: filter };
    } catch (error) {
        logger.error(`Error updating filter: ${error}`);
        return { error: "Could not update filter" };
    }
}

async function deleteFilter(filterId: string): Promise<Result<null>> {
    try {
        const result = await prisma.filter.delete({
            where: { id: filterId }
        });
        return { data: null };
    } catch (error) {
        logger.error(`Error deleting filter: ${error}`);
        return { error: "Could not delete filter" };
    }
}

export { getAllFilters, getFilterById, createFilter, updateFilter, deleteFilter };
