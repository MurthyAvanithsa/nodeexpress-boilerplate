import jwt, { JwtPayload } from 'jsonwebtoken';

import { logger } from '../logger/log';

export interface payload extends JwtPayload {
    "http://group"?: string;
}

export const getDecodedToken = (authToken: string) => {
    logger.info(authToken);
    const token = authToken.split(' ')[1];
    return jwt.decode(token) as payload;
};