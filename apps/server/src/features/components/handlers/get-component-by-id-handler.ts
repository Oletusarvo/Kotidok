import { db } from '../../../db-config';
import { componentRepo, ComponentRepo } from '../../../repos/component-repo';
import { createHandler } from '../../../server-utils/create-handler';
import { AuthenticatedExpressRequest } from '../../../server-utils/types/express';

export const getComponentByIdHandler = createHandler(
  async (req: AuthenticatedExpressRequest, res) => {
    const { id } = req.params as { id: string };
    const component = await componentRepo.findById(id, db);
    if (!component) {
      return res.status(404);
    }
    return res.status(200).json(component);
  },
);
