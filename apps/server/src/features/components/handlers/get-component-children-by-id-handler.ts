import { db } from '../../../db-config';
import { componentRepo } from '../../../repos/component-repo';
import { createHandler } from '../../../server-utils/create-handler';
import { AuthenticatedExpressRequest } from '../../../server-utils/types/express';
import { applyPagination } from '../../../util/apply-pagination';

export const getComponentChildrenByIdHandler = createHandler(
  async (req: AuthenticatedExpressRequest, res) => {
    const { id } = req.params as { id: string };
    const { name, page, limit } = req.query as { name: string; page: string; limit: string };
    const q = componentRepo.findChildrenById(id, db);
    if (name) {
      q.where(function () {
        const qstr = `%${name}%`;
        this.whereILike('name', qstr);
      });
    }

    if (page && limit) {
      applyPagination(q, page, limit);
    }

    const children = await q;
    return res.status(200).json(children);
  },
);
