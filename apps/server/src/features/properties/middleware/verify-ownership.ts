import { db } from '../../../db-config';
import { createMiddleware } from '../../../server-utils/create-handler';
import { AuthenticatedExpressRequest } from '../../../server-utils/types/express';
import { tablenames } from '../../../tablenames';

export const verifyOwnership = createMiddleware(
  async (req: AuthenticatedExpressRequest, res, next) => {
    const { propertyId } = req.params;
    const session = req.session;
    const ownership = await db({ role: tablenames.role_data })
      .join(db.raw('?? AS c ON c.id = role.component_id', [tablenames.component_data]))
      .where({
        user_id: session.user.id,
        component_id: propertyId,
      })
      .whereRaw("c.component_type_id = (SELECT id FROM ?? WHERE label = 'property' LIMIT 1)", [
        tablenames.component_type,
      ])
      .first();

    if (!ownership) {
      return res.status(403).json({
        error: 'property:no-ownership',
      });
    }

    next();
  },
);
