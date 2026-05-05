import { X } from 'lucide-react';
import { Button } from './button';

type ModalProps = React.PropsWithChildren & {
  title: string;
  onClose?: () => void;
};

export function Modal({ children, title, onClose }: ModalProps) {
  return (
    <div className='fixed top-0 left-0 w-full h-full justify-center backdrop-blur-md px-4 z-90 flex-col'>
      <div className='bg-white shadow-lg rounded-xl p-4 flex-col animate-app-screen'>
        <div className='items-center w-full justify-between mb-4'>
          <h3 className='text-slate-500 text-lg'>{title}</h3>
          <Button
            variant='ghost'
            onClick={onClose}>
            <X
              size='1.2rem'
              color='var(--color-slate-500)'
            />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
