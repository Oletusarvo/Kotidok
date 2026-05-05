import z from 'zod';
import { db } from '../../../db-config';
import { componentRepo } from '../../../repos/component-repo';
import { propertyRepo } from '../../../repos/property-repo';
import { createHandler } from '../../../server-utils/create-handler';
import { AuthenticatedExpressRequest } from '../../../server-utils/types/express';
import { propertySchema } from '@kotidok/schemas';

/**Creates a new property. Also creates an owner-role on the property for the currently authenticated user. */
export const createPropertyHandler = createHandler(
  async (req: AuthenticatedExpressRequest<z.infer<typeof propertySchema>>, res) => {
    const session = req.session;
    await db.transaction(async trx => {
      const { cadastral_id, ...component } = req.data;
      //Create the property.
      const [{ id: property_id }] = await componentRepo
        .create(
          {
            ...component,
            type: 'property',
            metadata: {
              ...component.metadata,
              cadastral_id,
            },
          },
          trx,
        )
        .returning('id');

      await propertyRepo.createRole(
        {
          user_id: session.user.id,
          component_id: property_id,
          role: 'owner',
        },
        trx,
      );
    });
    return res.status(200).end();
  },
);
