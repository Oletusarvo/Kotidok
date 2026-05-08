import { useNavigate } from 'react-router-dom';
import { AppScreen } from '../../../components/app-screen';
import { Input, Select } from '../../../components/input';
import { Box, IdCard, Type, TypeIcon } from 'lucide-react';
import { useState } from 'react';
import { ComponentType } from '@kotidok/types';
import { HelperText } from '../../../components/helper-text';

export function CreateComponentScreen() {
  const navigate = useNavigate();
  const [idState, setIdState] = useState<string | null>(null);

  return (
    <AppScreen
      onClose={() => navigate('/')}
      title='Luo Osa'>
      <div className='flex-col w-full flex-1 gap-4 justify-center h-full'>
        <div className='flex-col w-full'>
          <Input
            onChange={e => {
              if (e.target.value) {
                setIdState('success');
              } else {
                setIdState(null);
              }
            }}
            variant={idState as any}
            icon={<Box />}
            placeholder='Luo osalle ID...'
            name={'name'}
            monospace
          />

          <HelperText>ID:n on oltava ainutlaatuinen.</HelperText>
        </div>
        <Select
          name='component_type'
          icon={<TypeIcon />}>
          {Object.keys(ComponentType).map((t, i) => (
            <option
              key={i}
              value={t}>
              {t}
            </option>
          ))}
        </Select>
        <button className='button w-full shadow-md --contained --primary py-2 px-4 rounded-md'>
          Luo osa
        </button>
      </div>
    </AppScreen>
  );
}
