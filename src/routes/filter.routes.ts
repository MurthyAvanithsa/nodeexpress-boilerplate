import { Router } from 'express';
import { getFilters, getFilterById, createFilter, updateFilter, deleteFilter } from '../services/filter.services';
import { UpdateFilterRequest,
    UpdateFilterResponse,
    CreateFilterRequest,
    CreateFilterResponse,
    DeleteFilterRequest, 
    DeleteFilterResponse,
    Filter,
    GetAllFiltersResponse,
    GetFilterByIdResponse,
    GetFilterByIdRequest } from "../types/filter.types"
import { Request, Response } from 'express';
const filterRouter = Router();

filterRouter.get("/filter/", async (req: Request, res: Response)=> {
    const filters: GetAllFiltersResponse = await getFilters();
    res.send(filters);
});

filterRouter.get("/filter/:filterId", async (req: Request<{filterId: GetFilterByIdRequest}, GetFilterByIdResponse, {}>, res: Response)=> {
    const filterId = req.params.filterId;
    const filter: GetFilterByIdResponse = await getFilterById(filterId)
    res.send(filter);
});

filterRouter.post("/filter/", async (req: Request<{}, CreateFilterResponse, CreateFilterRequest>, res: Response)=> {
    const filter: CreateFilterRequest = req.body;
    const createdFilter: CreateFilterResponse = await createFilter(filter);
    res.send(createdFilter);
});

filterRouter.put("/filter/:filterId", async (req: Request<{filterId: GetFilterByIdRequest}, UpdateFilterResponse, UpdateFilterRequest>, res: Response)=> {
    const filterId = req.params.filterId;
    const filter: UpdateFilterRequest = req.body;
    const createdFilter: UpdateFilterResponse = await updateFilter(filterId, filter);
    res.send(createdFilter);
});

filterRouter.delete("/filter/:filterId", async (req: Request<{filterId: DeleteFilterRequest}, DeleteFilterResponse, DeleteFilterRequest>, res: Response)=> {
    const filterId = req.params.filterId;
    const filter: DeleteFilterResponse = await deleteFilter(filterId)
    res.send(filter);
});

export default filterRouter;