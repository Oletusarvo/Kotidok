import { db } from '../../../db-config';
import { componentRepo } from '../../../repos/component-repo';
import { createHandler } from '../../../server-utils/create-handler';
import { AuthenticatedExpressRequest } from '../../../server-utils/types/express';

export const getPropertyComponentsByIdHandler = createHandler(
  async (req: AuthenticatedExpressRequest, res) => {
    const { propertyId } = req.params as { propertyId: string };
    const components = await componentRepo.findChildrenById(propertyId, db);
    return res.status(200).json(components);
  },
);
