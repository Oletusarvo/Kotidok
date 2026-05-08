import { componentSchema } from '@kotidok/schemas';
import { createBodyParser } from '../../server-utils/create-body-parser';
import { getRouter } from '../../server-utils/get-router';
import { checkAuth } from '../auth/middleware/check-auth';
import { getComponentByIdHandler } from './handlers/get-component-by-id-handler';
import { getComponentChildrenByIdHandler } from './handlers/get-component-children-by-id-handler';
import { getComponentEventsByIdHandler } from './handlers/get-component-events-by-id-handler';
import { getComponentRolesByIdHandler } from './handlers/get-component-roles-by-id-handler';
import { createComponentHandler } from './handlers/create-component-handler';
import { getComponentTransactionsByIdHandler } from './handlers/get-component-transactions-by-id-handler';

const router = getRouter();

router.get('/:id', getComponentByIdHandler);
router.get('/:id/children', getComponentChildrenByIdHandler);
router.get('/:id/events', getComponentEventsByIdHandler);
router.get('/:id/roles', getComponentRolesByIdHandler);
router.get('/:id/transactions', getComponentTransactionsByIdHandler);

router.post('/', checkAuth(), createBodyParser(componentSchema), createComponentHandler);
export { router as componentsRouter };
