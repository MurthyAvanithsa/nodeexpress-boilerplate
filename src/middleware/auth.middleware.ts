import { Request, Response } from 'express';

import config from '../config';

export const redirectToAuthorizationUrl = (req: Request, res: Response) => {
  const responseType = req.query.response_type;
  const clientId = config.oidc.clientId;
  const redirectUri = config.oidc.redirectUri;
  const state = req.query.state;
  const audience = config.oidc.audience;

  const authorizationUrl = `https://${config.oidc.domain}/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&audience=${audience}&state=${state}`;
  res.redirect(authorizationUrl);
};