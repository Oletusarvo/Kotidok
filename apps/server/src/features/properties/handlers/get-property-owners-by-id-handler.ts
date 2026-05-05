import { db } from '../../../db-config';
import { componentRepo } from '../../../repos/component-repo';
import { createHandler } from '../../../server-utils/create-handler';

/**A convenience handler for returning the owners of property-components. */
export const getPropertyOwnersByIdHandler = createHandler(async (req, res) => {
  const { propertyId } = req.params as { propertyId: string };
  const owners = await componentRepo.findRolesById(propertyId, db).where({ role_type: 'owner' });
  return res.status(200).json(owners);
});
