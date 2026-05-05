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
import { EventCard } from '../components/event-card';

export function ComponentEventsScreen() {
  const { id } = useParams();
  if (!id) {
    throw new Error('The id of the component is required to view this route!');
  }
  const [search, setSearch] = useState('');
  const { events, isLoading } = useComponentEvents(id, search);
  const navigate = useNavigate();
  const runSearch = debounce(setSearch, 700);
  return (
    <SearchableList
      searchPlaceholder='Etsi tapahtumaa nimellä...'
      onSearch={runSearch}
      onAddNew={() => navigate('/auth/events/create')}>
      {isLoading ? (
        <div className='flex-col items-center justify-center flex-1'>
          <Spinner />
        </div>
      ) : events.length > 0 ? (
        events.map((c: any) => (
          <EventCard
            onClick={() => navigate(`/auth/events/${c.id}`)}
            event={c}
            key={c.id}
          />
        ))
      ) : (
        <span>Ei tapahtumia.</span>
      )}
    </SearchableList>
  );
}

function useComponentEvents(componentId: string, title?: string) {
  const { data: events, isLoading } = useQuery({
    queryKey: ['component', componentId, 'events', title],
    queryFn: async () => {
      const res = await apiInterface.getComponentEvents(componentId, title);
      return res.status === 200 ? await res.json() : [];
    },
  });

  return { events, isLoading };
}
