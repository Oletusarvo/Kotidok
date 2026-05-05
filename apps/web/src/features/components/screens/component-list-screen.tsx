import { Plus, Search } from 'lucide-react';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';

type ComponentListScreenProps = {
  hook: () => { components: any[]; isLoading: boolean };
};

export function ComponentListScreen({ hook }: ComponentListScreenProps) {
  const { components, isLoading } = hook();
  return (
    <div className='flex-1 w-full flex-col gap-2 p-2'>
      <div className='w-full gap-2'>
        <Input
          icon={<Search />}
          type='search'
          placeholder='Etsi osaa...'
        />
        <Button
          rounded
          shadow>
          <Plus />
        </Button>
      </div>
    </div>
  );
}
