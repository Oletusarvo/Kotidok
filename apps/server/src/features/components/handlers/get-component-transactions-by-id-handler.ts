import { db } from '../../../db-config';
import { componentRepo } from '../../../repos/component-repo';
import { createHandler } from '../../../server-utils/create-handler';
import { AuthenticatedExpressRequest } from '../../../server-utils/types/express';

export const getComponentTransactionsByIdHandler = createHandler(
  async (req: AuthenticatedExpressRequest, res) => {
    const { id } = req.params as { id: string };
    const { q } = req.query;
    const qr = componentRepo.getTransactionsById(id, db);
    if (q) {
      qr.where(function () {
        const queryStr = `%${q}%`;
        this.whereILike('ct.name', queryStr);
      });
    }

    const transactions = await qr;
    return res.status(200).json(transactions);
  },
);
