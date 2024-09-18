import https from 'https';

import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

import config from '../config';

const domain = `https://dev-fulrxmb8tfh5ke8o.us.auth0.com${config.swagger.domain}`;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const jwtAuthMiddleware = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: `${domain}/.well-known/jwks.json`,
    requestAgent: agent,
  }) as GetVerificationKey,
  audience: `${domain}/api/v2/`,
  issuer: `${domain}/`,
  algorithms: ['RS256'],
});

export default jwtAuthMiddleware;