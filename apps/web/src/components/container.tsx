export type ContainerProps = Omit<React.ComponentProps<'div'>, 'className'>;

export function Container({ children, ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className='w-full p-2 bg-white shadow-sm border-black/20 rounded-md gap-4 cursor-pointer active:scale-98 transition:transform duration-100 items-center'>
      {children}
    </div>
  );
}
