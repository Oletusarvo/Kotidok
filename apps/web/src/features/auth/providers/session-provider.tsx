import { useQuery } from '@tanstack/react-query';
import { setupContext } from '../../../utils/setup-context';
import { apiInterface } from '../../../utils/api-interface';
import type z from 'zod';
import type {
  loginUserCredentialsSchema,
  registerUserDirectlyCredentialsSchema,
} from '@kotidok/schemas';

export type SessionStatusType = 'authenticated' | 'loading' | 'unauthenticated';
const [SessionContext, useSession] = setupContext<{
  session: {
    user: { id: string; email: string };
  } | null;
  status: SessionStatusType;
  login: (credentials: z.infer<typeof loginUserCredentialsSchema>) => Promise<Response>;
  logout: () => Promise<Response>;
  register: (
    credentials: z.infer<typeof registerUserDirectlyCredentialsSchema>,
  ) => Promise<Response>;
}>('SessionContext');

export function SessionProvider({ children }: React.PropsWithChildren) {
  const {
    data: session,
    isLoading: sessionPending,
    refetch,
  } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const res = await apiInterface.getUserSession();
      return res.status === 200 ? await res.json() : null;
    },
  });

  const status: SessionStatusType = session
    ? 'authenticated'
    : sessionPending
      ? 'loading'
      : 'unauthenticated';

  /**Logs a user in via calling the loginUser-method of the apiInterface-instance. Will refetch the users session on success, before returning the response. */
  const login = async (credentials: z.infer<typeof loginUserCredentialsSchema>) => {
    const res = await apiInterface.loginUser(credentials);
    if (res.status === 200) {
      await refetch();
    }
    return res;
  };

  /**Registers a user via calling the registerUser-method on the apiInterface-instance. Will return the response. */
  const register = async (credentials: z.infer<typeof registerUserDirectlyCredentialsSchema>) => {
    return await apiInterface.registerUser(credentials);
  };

  /**Logs a user out via calling the logoutUser-method of the apiInterface-instance. Refetches the users session on success, before returning the response. */
  const logout = async () => {
    const res = await apiInterface.logoutUser();
    if (res.status === 200) {
      await refetch();
    }
    return res;
  };

  return (
    <SessionContext.Provider value={{ session, status, login, register, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export { useSession };
