import { db } from '../../../db-config';
import { componentRepo } from '../../../repos/component-repo';
import { createHandler } from '../../../server-utils/create-handler';
import { AuthenticatedExpressRequest } from '../../../server-utils/types/express';

export const getComponentEventsByIdHandler = createHandler(
  async (req: AuthenticatedExpressRequest, res) => {
    const { id } = req.params as { id: string };
    const { title } = req.query;

    const q = componentRepo.findEventsById(id, db).where(function () {
      const qstr = `%${title}%`;
      this.whereILike('title', qstr);
    });
    const events = await q;
    return res.status(200).json(events);
  },
);
