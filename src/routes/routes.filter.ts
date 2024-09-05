import { Router } from 'express';
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
import { Request, Response } from 'express';
const filterRouter = Router();

filterRouter.get("/filter/", async (req: Request, res: Response)=> {
    const response: GetAllFiltersResponse = await getFilters();
    const responseCode = response.error ? 500 : 200;
    res.status(responseCode).json(response);
});

filterRouter.get("/filter/:id", async (req: Request<GetFilterByIdRequest, GetFilterByIdResponse>, res: Response<GetFilterByIdResponse | { error: string }>) => {
    const filterId = req.params.id;
    const response: GetFilterByIdResponse = await getFilterById(filterId);
    const responseCode = !response.data ? response.error === `Filter with ID ${filterId} not found` ? 404: 500 : 200;
    res.status(responseCode).json(response);  
});

filterRouter.post("/filter/", async (req: Request<unknown, CreateFilterResponse, CreateFilterRequest>, res: Response)=> {
    const filter: CreateFilterRequest = req.body;
    const response: CreateFilterResponse = await createFilter(filter);
    const responseCode = response.data ? 201: 500;
    res.status(responseCode).json(response);
});

filterRouter.put("/filter/:id", async (req: Request<GetFilterByIdRequest, UpdateFilterResponse, UpdateFilterRequest>, res: Response)=> {
    const filterId = req.params.id;
    const filter: UpdateFilterRequest = req.body;
    const response: UpdateFilterResponse = await updateFilter(filterId, filter);
    const responseCode = response.data? 200 : 500;
    res.status(responseCode).json(response);
});

filterRouter.delete("/filter/:id", async (req: Request<DeleteFilterRequest, DeleteFilterResponse, DeleteFilterRequest>, res: Response)=> {
    const filterId = req.params.id;
    const response: DeleteFilterResponse = await deleteFilter(filterId);
    const responseCode = response.data? 204 : 500;
    res.status(responseCode).json(response);
});

export default filterRouter;
