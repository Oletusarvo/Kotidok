import { Component } from '@kotidok/types';
import { Box, ChevronRight, Square } from 'lucide-react';
import { useMemo, type ReactNode } from 'react';
import { PassProps } from '../../../components/pass-props';
import { Container } from '../../../components/container';
import { componentIconMap } from '../../../utils/component-icon-map';

export type ComponentProps = Pick<React.ComponentProps<'div'>, 'onClick'> & {
  component: any;
};

export function ComponentCard({ component, ...props }: ComponentProps) {
  const icon = componentIconMap[component.component_type] || <Box />;
  const iconElement = <PassProps color='var(--color-secondary)'>{icon}</PassProps>;
  return (
    <Container {...props}>
      <div className='rounded-full aspect-square p-2 bg-secondary/10 items-center justify-center'>
        {iconElement}
      </div>
      <div className='flex-col w-full'>
        <span>{component.name}</span>
        <div className='font-mono text-slate-500 text-xs'>{component.id}</div>
        <span className='text-sm'>{`${component.child_count} jäsentä.`}</span>
        <span className='text-sm'>{`${component.event_count} tapahtumaa.`}</span>
      </div>
      <ChevronRight color='var(--color-slate-500)' />
    </Container>
  );
}
