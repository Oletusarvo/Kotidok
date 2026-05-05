import type { ReactNode } from 'react';
import { PassProps } from './pass-props';
import { Check, TriangleAlert, X } from 'lucide-react';
import { useClassName } from '../hooks/use-class-name';

type HelperNoticeProps = React.PropsWithChildren & {
  variant?: 'success' | 'error' | 'warning';
  icon?: ReactNode;
};

export function HelperNotice({ children, variant, icon }: HelperNoticeProps) {
  const className = useClassName(
    'border p-4 w-full rounded-md items-center gap-2 justify-center',
    variant === 'success'
      ? 'border-green-300 bg-green-50 text-green-700'
      : variant === 'error'
        ? 'border-red-300 bg-red-50 text-red-700'
        : variant === 'warning'
          ? 'border-amber-300 bg-amber-50 text-amber-700'
          : 'border-slate-300 bg-slate-50 text-slate-700',
  );

  const iconColor =
    variant === 'success'
      ? 'var(--color-green-700)'
      : variant === 'warning'
        ? 'var(--color-amber-700)'
        : variant === 'error'
          ? 'var(--color-red-700)'
          : 'var(--color-slate-700)';

  const iconElement = (
    <PassProps
      size='1.25rem'
      color={iconColor}>
      {icon}
    </PassProps>
  );

  return (
    <div className={className}>
      {iconElement}
      <span>{children}</span>
    </div>
  );
}

export function SuccessHelperNotice({ children }: React.PropsWithChildren) {
  return (
    <HelperNotice
      variant='success'
      icon={<Check />}>
      {children}
    </HelperNotice>
  );
}

export function ErrorHelperNotice({ children }: React.PropsWithChildren) {
  return (
    <HelperNotice
      variant='error'
      icon={<X />}>
      {children}
    </HelperNotice>
  );
}

export function WarningHelperNotice({ children }: React.PropsWithChildren) {
  return (
    <HelperNotice
      variant='warning'
      icon={<TriangleAlert />}>
      {children}
    </HelperNotice>
  );
}
