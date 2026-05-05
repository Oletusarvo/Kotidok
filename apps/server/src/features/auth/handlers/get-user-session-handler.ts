import { createHandler } from '../../../server-utils/create-handler';
import { AuthenticatedExpressRequest } from '../../../server-utils/types/express';

export const getUserSessionHandler = createHandler(
  async (req: AuthenticatedExpressRequest, res) => {
    const session = req.session;
    return res.status(200).json(session);
  },
);
