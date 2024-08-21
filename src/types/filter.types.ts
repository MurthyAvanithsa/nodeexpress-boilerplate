type filterParams = {
  name: string;
  type: string;
  required: boolean;
};

type Filter = {
  id: string;
  name: string;
  type: string;
  description?: string;
  code: string | null;
  filterParams: filterParams[] | null;
};

type GetAllFiltersResponse = {
  data: Omit<Filter, "code" | "description" | "filterParams">[];
};

type GetFilterByIdRequest = Pick<Filter, "id">;
type GetFilterByIdResponse = { data: Filter };

type UpdateFilterRequest = Filter;
type CreateFilterRequest = Omit<Filter, "id">;
type DeleteFilterRequest = Pick<Filter, "id">;

type UpdateFilterResponse = { data: Filter };
type CreateFilterResponse = { data: Filter };
type DeleteFilterResponse = { data: Pick<Filter, "id"> };

export {
  UpdateFilterRequest,
  UpdateFilterResponse,
  CreateFilterRequest,
  CreateFilterResponse,
  DeleteFilterRequest, 
  DeleteFilterResponse,
  Filter,
  GetAllFiltersResponse,
  GetFilterByIdResponse,
  GetFilterByIdRequest,
};
