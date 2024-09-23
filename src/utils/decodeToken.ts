import jwt, { JwtPayload } from 'jsonwebtoken';

export interface payload extends JwtPayload {
    "http://group"?: string;
}

export const getDecodedToken = (authToken: string) => {
    const token = authToken.split(' ')[1];
    return jwt.decode(token) as payload;
};