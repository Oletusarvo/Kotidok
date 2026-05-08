import { Component } from '@kotidok/types';
import { Box, ChevronRight, Square } from 'lucide-react';
import { useMemo, type ReactNode } from 'react';
import { PassProps } from '../../../components/pass-props';
import { Container } from '../../../components/container';
import { componentIconMap } from '../../../utils/component-icon-map';
import { useClassName } from '../../../hooks/use-class-name';
import { componentTypeNameMap } from '../../../utils/name-maps/component-type-name-map';

export type ComponentProps = Pick<React.ComponentProps<'div'>, 'onClick'> & {
  component: any;
};

export function ComponentCard({ component, ...props }: ComponentProps) {
  const icon = componentIconMap[component.component_type] || <Box />;
  const iconElement = <PassProps color='var(--color-secondary)'>{icon}</PassProps>;
  const stateClassName = useClassName(
    'text-sm font-semibold',
    component.is_active ? 'text-green-600' : 'text-red-600',
  );
  const componentTypeName =
    componentTypeNameMap[component.component_type as keyof typeof componentTypeNameMap] ||
    component.component_type;

  return (
    <Container {...props}>
      <div className='rounded-full aspect-square p-2 bg-secondary/10 items-center justify-center'>
        {iconElement}
      </div>
      <div className='flex-col w-full'>
        <div className='flex-col items-start mb-1'>
          <span>{component.name}</span>
          <div className='font-mono text-slate-500 text-xs'>{component.id}</div>
          <div className='text-sm text-primary font-semibold'>{componentTypeName}</div>
        </div>

        <span className={stateClassName}>
          {component.is_active ? 'Aktiivinen' : 'Ei Aktiivinen'}
        </span>
        <span className='text-sm'>{`${component.child_count} jäsentä.`}</span>
        <span className='text-sm'>{`${component.event_count} tapahtumaa.`}</span>
      </div>
      <ChevronRight color='var(--color-slate-500)' />
    </Container>
  );
}
