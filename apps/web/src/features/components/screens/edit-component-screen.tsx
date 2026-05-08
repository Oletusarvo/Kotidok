import { useNavigate } from 'react-router-dom';
import { AppScreen } from '../../../components/app-screen';
import { useComponent } from '../providers/component-provider';
import { Input } from '../../../components/input';
import { Check, Plus, Type } from 'lucide-react';
import { Button } from '../../../components/button';

export function EditComponentScreen() {
  const { component } = useComponent();
  const navigate = useNavigate();
  return (
    <AppScreen
      onClose={() => navigate(-1)}
      title='Muokkaa Osaa'
      headerShown>
      <div className='flex-col gap-4 w-full p-2'>
        <Input
          defaultValue={component.name}
          placeholder='Anna osalle nimi...'
          icon={<Type />}
        />
        <Button
          variant='outlined'
          borderStyle='dashed'
          fullWidth>
          <Plus className='text-primary' />
          Lisää mukautettu tieto
        </Button>
        <Button
          variant='outlined'
          fullWidth>
          <Check color='var(--color-primary)' />
          Tallenna
        </Button>
      </div>
    </AppScreen>
  );
}
