import { propertySchema } from '@kotidok/schemas';
import { createPropertyHandler } from './handlers/create-property-handler';
import { getRouter } from '../../server-utils/get-router';
import { checkAuth } from '../auth/middleware/check-auth';
import { getPropertiesByOwnerHandler } from './handlers/get-properties-handler';
import { createBodyParser } from '../../server-utils/create-body-parser';
import { getPropertyOwnersByIdHandler } from './handlers/get-property-owners-by-id-handler';
import { getPropertyComponentsByIdHandler } from './handlers/get-property-components-by-id-handler';
import { verifyOwnership } from './middleware/verify-ownership';
const router = getRouter();

router.get('/', checkAuth(), getPropertiesByOwnerHandler);
router.get('/:propertyId/owners', verifyOwnership, getPropertyOwnersByIdHandler);
router.get('/:propertyId/components', verifyOwnership, getPropertyComponentsByIdHandler);
router.post('/', checkAuth(), createBodyParser(propertySchema), createPropertyHandler);

export { router as propertiesRouter };
