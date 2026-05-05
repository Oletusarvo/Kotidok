import { Type } from 'lucide-react';
import { AppScreen } from '../../../components/app-screen';
import { Input } from '../../../components/input';
import { useOnSubmit } from '../../../hooks/use-on-submit';
import { apiInterface } from '../../../utils/api-interface';
import { Button } from '../../../components/button';

export function CreateEventScreen() {
  const { status, loading, onSubmit } = useCreateEvent();
  return (
    <AppScreen title='Luo Tapahtuma'>
      <div className='flex-1 w-full justify-center'>
        <form
          className='gap-2 flex-col w-full'
          onSubmit={onSubmit}>
          <Input
            name='title'
            placeholder='Anna tapahtuman otsikko...'
            required
            icon={<Type />}
          />
          <div className='gap-2 w-full'>
            <Button
              disabled={loading}
              variant='outlined'
              fullWidth>
              Peruuta
            </Button>
            <Button
              disabled={loading}
              type='submit'
              shadow
              fullWidth>
              Luo
            </Button>
          </div>
        </form>
      </div>
    </AppScreen>
  );
}

export function useCreateEvent() {
  const { status, loading, onSubmit } = useOnSubmit({
    fetchFn: async payload => {
      return await apiInterface.createEvent(payload);
    },
  });

  return { status, loading, onSubmit };
}
