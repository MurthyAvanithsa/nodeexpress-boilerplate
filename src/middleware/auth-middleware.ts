import { Request, Response } from 'express';

import config from '../config';

const domain = config.swagger.domain;

export const redirectToAuthorizationUrl = (req: Request, res: Response) => {
  const responseType = req.query.response_type;
  const clientId = req.query.client_id;
  const redirectUri = req.query.redirect_uri;
  const state = req.query.state; // For further usage
  const audience = `https://${domain}/api/v2/`;

  const authorizationUrl = `https://${domain}/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&audience=${audience}&state=${state}`;
  res.redirect(authorizationUrl);
};