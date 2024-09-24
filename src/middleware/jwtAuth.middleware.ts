import https from "https";

import { expressjwt, GetVerificationKey } from "express-jwt";
import jwksRsa from "jwks-rsa";

import config from "../config";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const jwtAuthMiddleware = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: config.oidc.webKeySetUrl,
    requestAgent: agent,
  }) as GetVerificationKey,
  audience: config.oidc.audience,
  issuer: config.oidc.issuer,
  algorithms: ["RS256"],
}).unless({
  path: ["/job"],
});

export default jwtAuthMiddleware;