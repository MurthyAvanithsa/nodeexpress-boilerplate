import { JsonValue } from "@prisma/client/runtime/library";

export type FilterParams = {
  name: string;
  type: string;
  required: boolean;
};

export type Filter = {
  id: string;
  name: string;
  type: string;
  description?: string;
  code: string | null;
  filterParams: JsonValue[];
};

type UpdateAndCreateFilterRequest = {
  name: string;
  type: string;
  description?: string;
  code: string;
  filterParams: FilterParams[];
};

type DeleteAndGetFilterRequest = {
  id: string;
};


// Requests
export type CreateFilterRequest = UpdateAndCreateFilterRequest;
export type UpdateFilterRequest = UpdateAndCreateFilterRequest;
export type DeleteFilterRequest = DeleteAndGetFilterRequest;
export type GetFilterByIdRequest = DeleteAndGetFilterRequest;

// Responses
export type GetAllFiltersResponse = {
  data?: {
    id: string;
    name: string;
    type: string;
  }[],
};

export type GetFilterByIdResponse = { data?: Filter };
export type UpdateFilterResponse = { data?: Filter };
export type CreateFilterResponse = { data?: Filter };
export type DeleteFilterResponse = { data?: DeleteAndGetFilterRequest };
