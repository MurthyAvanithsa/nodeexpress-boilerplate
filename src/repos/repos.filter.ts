import { PrismaClient } from '@prisma/client';
import {
    UpdateFilterResponse,
    CreateFilterResponse,
    DeleteFilterResponse,
    GetAllFiltersResponse,
    GetFilterByIdResponse,
    GetFilterByIdRequest,
    CreateFilterRequest,
    UpdateFilterRequest,
    DeleteFilterRequest,
    filterParams
} from "../types/types.filter";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Repository Functions

// Get all filters
async function getAllFilters(): Promise<GetAllFiltersResponse> {
    const filters = await prisma.filter.findMany({
        select: {
            id: true,
            name: true,
            type: true
        }
    });
    return {
        data: filters
    };
}

// Get filter by ID
async function getFilterById(req: GetFilterByIdRequest): Promise<GetFilterByIdResponse> {
    const filter = await prisma.filter.findUnique({
        where: { id: req.id }
    });
    if (!filter) {
        throw new Error('Filter not found');
    }
    const filterParams = filter.filterParams as filterParams[];
    return {
        data: {
            id: filter.id,
            name: filter.name,
            type: filter.type,
            description: filter.description,
            filterParams,
            code: filter.code
        }
    };
}

// Create a new filter
async function createFilter(req: CreateFilterRequest): Promise<CreateFilterResponse> {
    const filterParams: Prisma.JsonValue[] = req.filterParams 
        ? req.filterParams 
        : undefined;
    const filter = await prisma.filter.create({
        data: {
            name: req.name,
            type: req.type,
            filterParams: filterParams,
            code: req.code
        }
    });
    return {
        data: {
            id: filter.id,
            name: filter.name,
            type: filter.type,
            filterParams: filter.filterParams,
            code: filter.code
        }
    };
}

// // Update an existing filter
// async function updateFilter(id: GetFilterByIdRequest, filter: UpdateFilterRequest): Promise<UpdateFilterResponse> {
//     const updatedFilter = await prisma.filter.update({
//         where: { id: id.id },
//         data: {
//             name: filter.name,
//             type: filter.type,
//             filterParams: filter.filterParams,
//             code: filter.code
//         }
//     });
//     return {
//         data: {
//             id: updatedFilter.id,
//             name: updatedFilter.name,
//             type: updatedFilter.type,
//             filterParams: updatedFilter.filterParams,
//             code: updatedFilter.code
//         }
//     };
// }

// // Delete a filter
// async function deleteFilter(req: DeleteFilterRequest): Promise<DeleteFilterResponse> {
//     await prisma.filter.delete({
//         where: { id: req.id }
//     });
//     return {
//         data: {
//             id: req.id
//         }
//     };
// }

// export { getAllFilters, getFilterById, createFilter, updateFilter, deleteFilter };

export { getAllFilters, getFilterById }


