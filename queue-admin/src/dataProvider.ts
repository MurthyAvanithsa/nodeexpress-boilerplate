import { DataProvider, fetchUtils } from "react-admin";
import { stringify } from "query-string";

import { getAccessToken } from "./getAccessToken";

const apiUrl = "http://localhost:3000";
const httpClient = fetchUtils.fetchJson;
let accessToken: string;

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    accessToken = await getAccessToken();
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      pagination: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    };
    return httpClient(url, options).then(({ json }) => ({
      data: json.data,
      total: json.data.length || 10,
    }));
  },

  getOne: async (resource, params) => {
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    };
    return httpClient(`${apiUrl}/${resource}/${params.id}`, options).then(({ json }) => ({
      data: json.data,
    }));
  },

  getMany: () => Promise.reject(new Error("Method not implemented")),
  getManyReference: () => Promise.reject(new Error("Method not implemented")),
  create: () => Promise.reject(new Error("Method not implemented")),
  update: () => Promise.reject(new Error("Method not implemented")),
  updateMany: () => Promise.reject(new Error("Method not implemented")),
  delete: () => Promise.reject(new Error("Method not implemented")),
  deleteMany: () => Promise.reject(new Error("Method not implemented")),
};