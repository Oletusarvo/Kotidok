import { useQuery } from '@tanstack/react-query';
import { AppScreen } from '../../../components/app-screen';
import { apiInterface } from '../../../utils/api-interface';
import { useSession } from '../../auth/providers/session-provider';
import { Spinner } from '../../../components/spinner';
import { ComponentCard } from '../../components/components/component-card';
import { useNavigate } from 'react-router-dom';

export function PropertyListScreen() {
  const { properties, isLoading } = useOwnedProperties();
  const navigate = useNavigate();
  return (
    <AppScreen>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='w-full gap-2 p-4'>
          {properties.map((p: any, i: number) => (
            <ComponentCard
              onClick={() => navigate(`/auth/components/${p.id}/events`)}
              component={p}
              key={i}
            />
          ))}
        </div>
      )}
    </AppScreen>
  );
}

function useOwnedProperties() {
  const { session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const res = await apiInterface.getOwnedProperties();
      return res.status === 200 ? await res.json() : [];
    },
    enabled: session !== null,
  });

  return { properties: data, isLoading };
}
