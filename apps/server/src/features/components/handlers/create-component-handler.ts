import z from 'zod';
import { createHandler } from '../../../server-utils/create-handler';
import { AuthenticatedExpressRequest } from '../../../server-utils/types/express';
import { componentSchema } from '@kotidok/schemas';
import { componentRepo } from '../../../repos/component-repo';
import { db } from '../../../db-config';

/** Creates a new component.*/
export const createComponentHandler = createHandler(
  async (req: AuthenticatedExpressRequest<z.infer<typeof componentSchema>>, res) => {
    await componentRepo.create(req.data, db);
    return res.status(200).end();
  },
);
