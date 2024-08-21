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
}  from "../types/filter.types";

async function getFilters(): Promise<GetAllFiltersResponse> {
    return {
        data: [
        {
            id: "1",
            name: "Filter 1",
            type: "AssetFilter"
        },
    ] };
}

async function getFilterById(req: GetFilterByIdRequest): Promise<GetFilterByIdResponse> {
    return {
        data: {
            id: "1",
            name: "Filter 1",
            type: "AssetFilter",
            filterParams: null,
            code: null
        }
    }
}

async function createFilter(req: CreateFilterRequest): Promise<CreateFilterResponse> {
    return {
        data: {
            id: "1",
            name: "Filter 1",
            type: "AssetFilter",
            filterParams: null,
            code: null
        }
    }
}

async function updateFilter(id: GetFilterByIdRequest, filter: UpdateFilterRequest): Promise<UpdateFilterResponse> {
    return {
        data: {
            id: "1",
            name: "Filter 1",
            type: "AssetFilter",
            filterParams: null,
            code: null
        }
    }
}

async function deleteFilter(id: DeleteFilterRequest): Promise<DeleteFilterResponse> {
    return {
        data: {
            id: "1"
        }
    }
}

export { getFilters, getFilterById, deleteFilter, updateFilter, createFilter }