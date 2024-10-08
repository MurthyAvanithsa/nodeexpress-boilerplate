import * as OpenApiValidator from "express-openapi-validator";

import { openApiSpecPath } from "../utils/utils.swagger";

export const openApiValidator = OpenApiValidator.middleware({
  apiSpec: openApiSpecPath,
  validateRequests: true,
  validateResponses: true,
  ignorePaths: /.*\/job$/,
});
