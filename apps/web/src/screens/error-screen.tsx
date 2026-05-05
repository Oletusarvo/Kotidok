import type { ReactNode } from 'react';
import { PassProps } from '../components/pass-props';
import { CircleQuestionMark, HardHat, TriangleAlert } from 'lucide-react';
import { Button } from '../components/button';
import { useNavigate } from 'react-router-dom';
import { AppScreen } from '../components/app-screen';
import React from 'react';

export type ErrorScreenProps = React.PropsWithChildren & {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export function ErrorScreen({
  title,
  description,
  icon = <TriangleAlert />,
  children,
}: ErrorScreenProps) {
  const iconElement = (
    <PassProps
      color='var(--color-primary)'
      size='3rem'>
      {icon}
    </PassProps>
  );

  return (
    <div className='flex-col items-center justify-center flex-1 w-full px-4 gap-4 animate-app-screen'>
      {iconElement}
      <div className='flex-col items-center'>
        <h2 className='text-slate-500 font-semibold text-lg'>{title}</h2>
        <p className='text-slate-500 text-sm text-center'>{description}</p>
      </div>

      {children}
    </div>
  );
}

export function ErrorScreenWithReturn(props: ErrorScreenProps) {
  const navigate = useNavigate();
  return (
    <ErrorScreen {...props}>
      <Button
        variant='outlined'
        onClick={() => navigate(-1)}>
        Palaa takaisin
      </Button>
    </ErrorScreen>
  );
}

export function NotFoundErrorScreen() {
  return (
    <ErrorScreenWithReturn
      title='404'
      icon={<CircleQuestionMark />}
      description='Hups! Tätä ei löytynyt.'
    />
  );
}

export function NotImplementedErrorScreen({
  title,
}: Omit<ErrorScreenProps, 'description' | 'icon'>) {
  return (
    <ErrorScreen
      title={title}
      description=' This screen is a placeholder for one that should be implemented.'
      icon={<HardHat />}
    />
  );
}
