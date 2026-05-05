import { db } from '../db-config';
import { tablenames } from '../tablenames';
import { DBContext } from '../types';
import { ComponentRepo } from './component-repo';

import { propertySchema } from '@kotidok/schemas';
import z from 'zod';

class PropertyRepo extends ComponentRepo {
  /**Returns all properties being owned by a user by their id. */
  findByOwnerId(ownerId: string, ctx: DBContext) {
    return ctx({ t: this.tablename })
      .join(db.raw('?? AS cur ON cur.component_id = t.id', [tablenames.role_data]))
      .where({
        'cur.component_role_id': db
          .select('id')
          .from(tablenames.role_type)
          .where({ label: 'owner' })
          .limit(1),
        'cur.user_id': ownerId,
        't.component_type': 'property',
      })
      .select('t.*');
  }

  /**Returns a property by its id. */
  findById(id: string, ctx: DBContext) {
    return super.findById(id, ctx).where({ component_type: 'property' }).first();
  }

  /**Creates a new property. */
  create(payload: z.infer<typeof propertySchema>, ctx: DBContext) {
    propertySchema.parse(payload);

    return super.create(
      {
        name: payload.name,
        type: 'property',
        metadata: {
          cadastral_id: payload.cadastral_id,
        },
      },
      ctx,
    );
  }
}

export const propertyRepo = new PropertyRepo();
