import { withLoader } from '../hoc/with-loader';
import { useClassName } from '../hooks/use-class-name';

export type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'contained' | 'outlined' | 'ghost';
  color?: 'primary' | 'white';
  compact?: boolean;
  shadow?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
  borderStyle?: 'dashed' | 'solid';
};

export function Button({
  children,
  variant = 'contained',
  color = 'primary',
  borderStyle = 'solid',
  compact,
  rounded,
  shadow,
  fullWidth,
  ...props
}: ButtonProps) {
  const className = useClassName(
    'button items-center gap-2',
    `--${variant} --${color}`,
    borderStyle === 'dashed' ? 'border-dashed' : 'border-solid',
    shadow ? 'shadow-md' : '',
    fullWidth ? 'w-full' : '',
    rounded
      ? 'rounded-full aspect-square p-1'
      : compact
        ? 'rounded-md p-1'
        : 'py-2 px-4 rounded-md',
  );
  const type = props.type || 'button';
  return (
    <button
      {...props}
      type={type}
      className={className}>
      {children}
    </button>
  );
}

export type TabButtonProps = Pick<React.ComponentProps<typeof Button>, 'onClick' | 'children'> & {
  selected?: boolean;
};

export const TabButton = function ({ children, selected, ...props }: TabButtonProps) {
  const containerClassName = useClassName(
    'border-b-2 w-full transition:colors duration:700',
    selected ? 'border-primary' : 'border-transparent',
  );

  return (
    <div className={containerClassName}>
      <Button
        {...props}
        variant='ghost'
        fullWidth>
        {children}
      </Button>
    </div>
  );
};

export const LoaderButton = withLoader(Button);
