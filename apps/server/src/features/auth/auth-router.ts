import { createBodyParser } from '../../server-utils/create-body-parser';
import { getRouter } from '../../server-utils/get-router';
import { loginUserHandler } from './handlers/login-user-handler';
import { registerUserDirectlyHandler } from './handlers/register-user-directly-handler';
import {
  loginUserCredentialsSchema,
  registerUserDirectlyCredentialsSchema,
  resetPasswordSchema,
} from '@kotidok/schemas';
import { resetPasswordHandler } from './handlers/reset-password-handler';
import { registerUserViaTokenHandler } from './handlers/register-user-via-token-handler';
import { checkAuth } from './middleware/check-auth';
import { getUserSessionHandler } from './handlers/get-user-session-handler';

const router = getRouter();

router.get('/session', checkAuth(), getUserSessionHandler);
router.post(
  '/register',
  createBodyParser(registerUserDirectlyCredentialsSchema),
  registerUserDirectlyHandler,
);

router.post('/login', createBodyParser(loginUserCredentialsSchema), loginUserHandler);
router.post('/reset-password', createBodyParser(resetPasswordSchema), resetPasswordHandler);

export { router as authRouter };
