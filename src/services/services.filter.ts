import {
    UpdateFilterResponse,
    CreateFilterResponse,
    DeleteFilterResponse,
    GetAllFiltersResponse,
    GetFilterByIdResponse,
    CreateFilterRequest,
    UpdateFilterRequest,
} from "../types/types.filter";
import * as filterRepo from "../repos/repos.filter";

async function getFilters(): Promise<GetAllFiltersResponse> {
    const result = await filterRepo.getAllFilters();
    if (result.error) {
        return { error: result.error }
    }
    return {
        data: result.data!.map(filter => ({
            id: filter.id,
            name: filter.name,
            type: filter.type
        }))
    };
}

async function getFilterById(id: string): Promise<GetFilterByIdResponse> {
    const result = await filterRepo.getFilterById(id);
    if (result.error) {
        return { error: result.error };
    }
    return { data: result.data! };
}

async function createFilter(req: CreateFilterRequest): Promise<CreateFilterResponse> {
    const result = await filterRepo.createFilter({
        name: req.name,
        type: req.type,
        description: req.description || '',
        filterParams: req.filterParams,
        code: req.code
    });
    if (result.error) {
        return { error: result.error }
    }
    return { data: result.data! };
}

async function updateFilter(id: string, updates: UpdateFilterRequest): Promise<UpdateFilterResponse> {
    const result: UpdateFilterResponse = await filterRepo.updateFilter(id, {
        name: updates.name,
        type: updates.type,
        description: updates.description || '',
        filterParams: updates.filterParams,
        code: updates.code || null
    });
    if (result.error) {
        return { error: result.error };
    }
    return { data: result.data! };
}

async function deleteFilter(id: string): Promise<DeleteFilterResponse> {
    const result = await filterRepo.deleteFilter(id);
    if (result.error) {
        return { error: result.error }
    }
    return { data: { id } };
}

export { getFilters, getFilterById, createFilter, updateFilter, deleteFilter };
