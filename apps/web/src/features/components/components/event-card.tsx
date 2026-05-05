import { ChevronRight, History } from 'lucide-react';
import { PassProps } from '../../../components/pass-props';
import { Container } from '../../../components/container';

export type EventCardProps = Pick<React.ComponentProps<'div'>, 'onClick'> & {
  event: any;
};

export function EventCard({ event, ...props }: EventCardProps) {
  const icon = <History />;
  const iconElement = <PassProps color='var(--color-secondary)'>{icon}</PassProps>;
  return (
    <Container {...props}>
      <div className='rounded-full aspect-square p-2 bg-secondary/10 items-center justify-center'>
        {iconElement}
      </div>
      <div className='flex-col w-full'>
        <span>{event.title}</span>
        <div className='font-mono text-slate-500 text-xs'>{event.id}</div>
        <span className='text-sm'>{`${event.transactions.length} transaktiota.`}</span>
      </div>
      <ChevronRight color='var(--color-slate-500)' />
    </Container>
  );
}
