import { Plus } from 'lucide-react';
import { AppScreen, AppSubScreen } from '../../../components/app-screen';
import { Button } from '../../../components/button';
import { SearchBar } from '../../../components/searchbar';
import { useNavigate, useParams } from 'react-router-dom';
import { apiInterface } from '../../../utils/api-interface';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '../../../components/spinner';
import { ComponentCard } from '../components/component-card';
import { useState } from 'react';
import { debounce } from '../../../utils/debounce';
import { SearchableList } from '../../../components/searchable-list';

export function ComponentChildrenScreen() {
  const { id } = useParams();
  if (!id) {
    throw new Error('The id of the component is required to view this route!');
  }
  const [search, setSearch] = useState('');
  const { components, isLoading } = useComponentChildren(id, search);
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
      ) : components.length > 0 ? (
        components.map((c: any) => (
          <ComponentCard
            onClick={() => navigate(`/auth/components/${c.id}/children`)}
            component={c}
            key={c.id}
          />
        ))
      ) : (
        <span>Ei jäseniä.</span>
      )}
    </SearchableList>
  );
}

function useComponentChildren(componentId: string, name?: string) {
  const { data: components, isLoading } = useQuery({
    queryKey: ['component', componentId, 'children', name],
    queryFn: async () => {
      const res = await apiInterface.getComponentChildren(componentId, name);
      return res.status === 200 ? await res.json() : [];
    },
  });

  return { components, isLoading };
}
