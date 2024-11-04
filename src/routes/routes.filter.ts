import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';

import { getFilters, getFilterById, createFilter, updateFilter, deleteFilter } from '../services/services.filter';
import { UpdateFilterRequest,
    UpdateFilterResponse,
    CreateFilterRequest,
    CreateFilterResponse,
    DeleteFilterRequest,
    DeleteFilterResponse,
    GetAllFiltersResponse,
    GetFilterByIdResponse,
    GetFilterByIdRequest } from "../types/types.filter"
const filterRouter: Router = Router();

filterRouter.get("/filter/", async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const response: GetAllFiltersResponse = await getFilters();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

filterRouter.get("/filter/:id", async (req: Request<GetFilterByIdRequest, GetFilterByIdResponse>, res: Response<GetFilterByIdResponse | { error: string }>, next: NextFunction) => {
    try {
        const filterId = req.params.id;
        const response: GetFilterByIdResponse = await getFilterById(filterId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

filterRouter.post("/filter/", async (req: Request<unknown, CreateFilterResponse, CreateFilterRequest>, res: Response, next: NextFunction)=> {
    try {
        const filter: CreateFilterRequest = req.body;
        const response: CreateFilterResponse = await createFilter(filter);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
});

filterRouter.put("/filter/:id", async (req: Request<GetFilterByIdRequest, UpdateFilterResponse, UpdateFilterRequest>, res: Response, next: NextFunction)=> {
    try {
        const filterId = req.params.id;
        const filter: UpdateFilterRequest = req.body;
        const response: UpdateFilterResponse = await updateFilter(filterId, filter);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

filterRouter.delete("/filter/:id", async (req: Request<DeleteFilterRequest, DeleteFilterResponse, DeleteFilterRequest>, res: Response, next: NextFunction)=> {
    try {
        const filterId = req.params.id;
        const response: DeleteFilterResponse = await deleteFilter(filterId);
        res.status(204).json(response);
    } catch (error) {
        next(error);
    }
});

export default filterRouter;