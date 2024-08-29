import { expressjwt } from 'express-jwt';

const jwtSecret = 'jwt-secret';

export const jwtMiddleware = expressjwt({
  secret: jwtSecret,
  algorithms: ['HS256'],
});
