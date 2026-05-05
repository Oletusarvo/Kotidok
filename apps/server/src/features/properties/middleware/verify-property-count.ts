import { createMiddleware } from '../../../server-utils/create-handler';
import { AuthenticatedExpressRequest } from '../../../server-utils/types/express';
import { tablenames } from '../../../tablenames';

/** Verifies the user is within their allowed property count. */
/*
export const verifyPropertyCount = createMiddleware(
  async (req: AuthenticatedExpressRequest, res, next) => {
    const session = req.session;
    const permission = await db(tablenames.user_permission)
      .leftJoin(
        tablenames.properties,
        'properties.property.user_id',
        'users.user_permission.user_id',
      )
      .where({
        user_id: session.user.id,
      })
      .count('properties.property.* as property_count')
      .select(
        'users.user_permission.max_properties',
        db.raw('CAST(property_count AS INT) as property_count'),
      )
      .first();

    if (permission.property_count >= permission.max_properties) {
      return res.status(403).json({
        error: 'permission:max-properties',
      });
    }

    next();
  },
);
*/
