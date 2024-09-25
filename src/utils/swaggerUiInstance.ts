import path from "path";
import fs from "fs";

import * as yaml from "js-yaml";
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  customCss: "",
  customSiteTitle: "Microservices Boilerplate API Docs",
};
const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, "../swagger/swagger.yaml"), "utf8")
) as Record<string, any>;

export const openApiSpecPath = path.join(__dirname, "../swagger/swagger.yaml");
export const swaggerUiInstance = swaggerUi.setup(swaggerDocument, swaggerOptions);