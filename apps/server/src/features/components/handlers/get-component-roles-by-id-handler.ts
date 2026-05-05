import { db } from '../../../db-config';
import { componentRepo } from '../../../repos/component-repo';
import { createHandler } from '../../../server-utils/create-handler';

export const getComponentRolesByIdHandler = createHandler(async (req, res) => {
  const { id } = req.params as { id: string };
  const roles = await componentRepo.findRolesById(id, db);
  return res.status(200).json(roles);
});
