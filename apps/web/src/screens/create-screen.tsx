import type { ReactNode } from 'react';
import { AppScreen } from '../components/app-screen';
import { Container } from '../components/container';
import { PassProps } from '../components/pass-props';
import { Box, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CreateScreen() {
  const navigate = useNavigate();
  return (
    <AppScreen
      title='Luo'
      onClose={() => navigate('/auth/components')}>
      <div className='flex-col gap-2 w-full justify-center'>
        <ElementButton
          icon={<Box />}
          title='Uusi Komponentti'
          description='Napauta tähän luodaksesi uuden komponentin.'
        />
        <ElementButton
          icon={<History />}
          title='Uusi Tapahtuma'
          description='Napauta tähän luodaksesi uuden tapahtuman. Tapahtumat ovat järjestelmän virallinen totuuden lähde liittyen komponenttien tilaan.'
        />
      </div>
    </AppScreen>
  );
}

type ElementButtonProps = {
  icon?: ReactNode;
  title: string;
  description: string;
};

function ElementButton({ icon, title, description }: ElementButtonProps) {
  const iconElement = <PassProps color='var(--color-primary)'>{icon}</PassProps>;
  return (
    <Container>
      <div className='bg-primary/5 p-2 rounded-full grow-0'>{iconElement}</div>

      <div className='flex-col select-none'>
        <h2 className='font-semibold text-slate-500'>{title}</h2>
        <p className='text-sm'>{description}</p>
      </div>
    </Container>
  );
}
