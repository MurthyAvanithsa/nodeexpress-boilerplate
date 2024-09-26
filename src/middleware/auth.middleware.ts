import { NextFunction, Request, Response } from 'express';
import { Session } from 'express-session';

import config from '../config';
import { getAccessToken } from '../utils/utils.auth';
import { logger } from '../logger/log';

interface customSession extends Session {
  token?: string;
}

export const redirectToAuthorizationUrl = (req: Request, res: Response) => {
  const responseType = req.query.response_type;
  const clientId = config.oidc.clientId;
  const redirectUri = config.oidc.redirectUri;
  const state = req.query.state;
  const audience = config.oidc.audience;

  const authorizationUrl = `https://${config.oidc.domain}/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&audience=${audience}&state=${state}`;
  res.redirect(authorizationUrl);
};

export const handleLogin = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const token = await getAccessToken(code);
  (req.session as customSession).token = `Bearer ${token}`;
  res.redirect(`http://${config.app.host}:${config.app.port}/api-docs`);
};

export const handleLogout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      logger.error(err);
    }
  });
  res.redirect(`http://${config.app.host}:${config.app.port}/api-docs`);
};

export const setSessionVariable = (req: Request, res: Response, next: NextFunction) => {
  req.headers.authorization = (req.session as customSession).token;
  next();
}