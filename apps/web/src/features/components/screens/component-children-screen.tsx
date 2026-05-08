import { Box } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiInterface } from '../../../utils/api-interface';
import { Spinner } from '../../../components/spinner';
import { ComponentCard } from '../components/component-card';
import { useEffect, useState } from 'react';
import { debounce } from '../../../utils/debounce';
import { SearchableList } from '../../../components/searchable-list';
import { ErrorScreen } from '../../../screens/error-screen';
import { useInView } from 'react-intersection-observer';
import { useInfiniteScroll } from '../../../hooks/use-infinite-scroll';

export function ComponentChildrenScreen() {
  const { id } = useParams();
  const [search, setSearch] = useState('');
  const { components, isLoading, fetchNextPage } = useComponentChildren(id!, search);
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    console.log('Is in view...');
    if (inView && !isLoading) {
      fetchNextPage();
    }
  }, [inView, isLoading]);

  const navigate = useNavigate();
  const runSearch = debounce(setSearch, 700);

  return (
    <SearchableList
      searchPlaceholder='Etsi jäsentä nimellä...'
      onSearch={runSearch}
      onAddNew={() => navigate('/auth/components/create')}>
      {isLoading ? (
        <div className='flex-col items-center justify-center flex-1'>
          <Spinner />
        </div>
      ) : components && components.length > 0 ? (
        <>
          {components.map((c: any, i: number) => (
            <ComponentCard
              onClick={() => navigate(`/auth/components/${c.id}/children`)}
              component={c}
              key={c.id}
            />
          ))}
          <div
            ref={ref}
            className='w-full items-center'>
            {isLoading && <Spinner />}
          </div>
        </>
      ) : (
        <ErrorScreen
          title='Ei Jäseniä'
          icon={<Box />}></ErrorScreen>
      )}
    </SearchableList>
  );
}

function useComponentChildren(componentId: string, name?: string) {
  const {
    data: components,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteScroll({
    key: [componentId, 'children', name],
    limit: 10,
    fetchFn: async (page, limit) => {
      const res = await apiInterface.getComponentChildren(
        componentId,
        name,
        page, // page
        limit, // limit
      );
      const data = res.status === 200 ? await res.json() : [];
      return data;
    },
  });

  return {
    components,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
}
