import { DataProvider, fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:3000";
const httpClient = fetchUtils.fetchJson;

export const dataProvider: DataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      pagination: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    console.log(url);
    return httpClient(url).then(({ headers, json }) => ({
      data: json.data,
      total: json.data.length || 10,
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json.data,
    })),

  getMany: () => Promise.reject(new Error("Method not implemented")),
  getManyReference: () => Promise.reject(new Error("Method not implemented")),
  create: () => Promise.reject(new Error("Method not implemented")),
  update: () => Promise.reject(new Error("Method not implemented")),
  updateMany: () => Promise.reject(new Error("Method not implemented")),
  delete: () => Promise.reject(new Error("Method not implemented")),
  deleteMany: () => Promise.reject(new Error("Method not implemented")),
};
