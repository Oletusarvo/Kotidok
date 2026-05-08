import { ChevronLeft } from 'lucide-react';
import { Button } from './button';
import { useClassName } from '../hooks/use-class-name';

export type AppScreenProps = React.PropsWithChildren & { subScreen?: boolean } & (
    | {
        title?: string;
        headerShown?: boolean;
        onClose?: () => void;
      }
    | {
        headerShown: true;
        title: string;
        onClose: () => void;
      }
  );

export function AppScreen({ children, onClose, title, headerShown, subScreen }: AppScreenProps) {
  const containerClassName = useClassName(
    'flex-col animate-app-screen w-full bg-slate-50 grow-0 absolute top-0 left-0 h-full',
  );

  return (
    <div className={containerClassName}>
      {headerShown && (
        <div className='w-full items-center px-2 py-4 gap-4 border-b border-slate-200'>
          <Button
            variant='outlined'
            rounded
            onClick={onClose}>
            <ChevronLeft />
          </Button>
          {title && <h3 className='text-slate-500 font-semibold text-lg'>{title}</h3>}
        </div>
      )}

      {children}
    </div>
  );
}

export function AppSubScreen({ children, ...props }: Omit<AppScreenProps, 'subScreen'>) {
  return (
    <AppScreen
      {...props}
      subScreen={true}>
      {children}
    </AppScreen>
  );
}
