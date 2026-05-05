import { db } from '../../../db-config';
import { propertyRepo } from '../../../repos/property-repo';
import { createHandler } from '../../../server-utils/create-handler';
import { AuthenticatedExpressRequest } from '../../../server-utils/types/express';

/**Returns all properties owned by the currently authenticated user. */
export const getPropertiesByOwnerHandler = createHandler(
  async (req: AuthenticatedExpressRequest, res) => {
    const session = req.session;
    const properties = await propertyRepo.findByOwnerId(session.user.id, db);
    return res.status(200).json(properties);
  },
);
