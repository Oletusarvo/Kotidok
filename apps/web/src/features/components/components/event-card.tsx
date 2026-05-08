import { ChevronRight, History } from 'lucide-react';
import { PassProps } from '../../../components/pass-props';
import { Container } from '../../../components/container';
import { useClassName } from '../../../hooks/use-class-name';
import { transactionTypeNameMap } from '../../../utils/transaction-type-name-map';

export type EventCardProps = Pick<React.ComponentProps<'div'>, 'onClick'> & {
  event: any;
};

export function EventCard({ event, ...props }: EventCardProps) {
  const icon = <History />;
  const iconElement = <PassProps color='var(--color-secondary)'>{icon}</PassProps>;
  const typeClassName = useClassName(
    'text-sm font-semibold',
    event.transaction_type === 'installation'
      ? 'text-green-600'
      : event.transaction_type === 'removal'
        ? 'text-red-600'
        : 'text-cyan-600',
  );

  return (
    <Container {...props}>
      <div className='rounded-full aspect-square p-2 bg-secondary/10 items-center justify-center'>
        {iconElement}
      </div>
      <div className='flex-col w-full'>
        <span>{event.event.title}</span>
        <div className='font-mono text-slate-500 text-xs'>{event.event.id}</div>
        <span className='text-sm text-slate-500'>
          {new Date(event.created_at).toLocaleDateString('fi')}
        </span>
        <span className={typeClassName}>
          {transactionTypeNameMap[event.transaction_type as keyof typeof transactionTypeNameMap] ||
            event.transaction_type}
        </span>
      </div>
      <ChevronRight color='var(--color-slate-500)' />
    </Container>
  );
}
