import { serverConfig } from '../../../server-config';
import { createMiddleware } from '../../../server-utils/create-handler';
import { verifyJWT } from '../../../server-utils/jwt';
import { AuthenticatedExpressRequest } from '../../../server-utils/types/express';

/**Creates a middleware-function that allows requests through if preventUnauthorizedAccess is false, otherwise returns 401 if an access token is not part of the request. Upon authorized access, adds a TSession-object as part of the request. */
export const checkAuth = (preventUnauthorizedAccess: boolean = true) =>
  createMiddleware(async (req: AuthenticatedExpressRequest, res, next) => {
    const token = getAccessToken(req);
    if (!token && preventUnauthorizedAccess) {
      return res.status(401).json({
        error: 'auth:unauthorized',
      });
    } else if (token) {
      const payload = verifyJWT(token) as { id: string; username: string; email: string };
      req.session = {
        user: payload,
      };
    }

    next();
  });

const getAccessToken = (req: AuthenticatedExpressRequest) => {
  return req.cookies[serverConfig.accessTokenName] || req.headers.authorization?.split(' ').at(1);
};
