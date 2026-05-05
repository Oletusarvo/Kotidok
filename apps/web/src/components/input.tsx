import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import { PassProps } from './pass-props';
import { Lock, Mail } from 'lucide-react';
import { useClassName } from '../hooks/use-class-name';

export type InputProps = Omit<React.ComponentProps<'input'>, 'className'> & {
  monospace?: boolean;
  icon?: ReactElement;
  variant?: 'success' | 'warning' | 'error';
};

export function Input({ monospace, icon, variant, ...props }: InputProps) {
  const inputClassName = useClassName('input w-full py-2 px-2', monospace ? 'font-mono' : '');

  return (
    <InputContainer
      disabled={props.disabled}
      icon={icon}
      variant={variant}>
      <input
        className={inputClassName}
        {...props}
      />
    </InputContainer>
  );
}

export type DerivedInputProps = Omit<InputProps, 'name' | 'required' | 'icon' | 'placeholder'>;
export type PasswordInputProps = DerivedInputProps & {
  repeat?: boolean;
};

/**Renders an Input pre-defined for passwords. */
export function PasswordInput({ repeat, ...props }: PasswordInputProps) {
  const name = repeat ? 'password2' : 'password';
  const placeholder = repeat ? 'Toista salasanasi...' : 'Anna salasanasi...';
  return (
    <Input
      {...props}
      placeholder={placeholder}
      type='password'
      name={name}
      required
      icon={<Lock />}
    />
  );
}

export type EmailInputProps = DerivedInputProps;

/**Renders and Input pre-defined for emails. */
export function EmailInput(props: EmailInputProps) {
  return (
    <Input
      {...props}
      placeholder='Anna sähköpostiosoitteesi...'
      name={'email'}
      required
      icon={<Mail />}
    />
  );
}

export type SelectProps = InputProps & React.ComponentProps<'select'>;

export function Select({ children, variant, icon, disabled, ...props }: SelectProps) {
  return (
    <InputContainer
      disabled={disabled}
      icon={icon}
      variant={variant}>
      <select
        {...props}
        disabled={disabled}
        className='w-full py-4'>
        {children}
      </select>
    </InputContainer>
  );
}

type ContainerProps = React.PropsWithChildren & {
  variant?: InputProps['variant'];
  icon?: ReactNode;
  disabled?: boolean;
};

/**
 * A container for input elements.
 * It is responsible for arranging a possible icon with the input provided as children,
 * and changing the background- and border colors depending on variant.
 * */
function InputContainer({ children, icon, variant, disabled }: ContainerProps) {
  const containerClassName = useClassName(
    'w-full rounded-md border items-center transition:colors duration-200 relative overflow-hidden',
    variant === 'success' ? 'border-green-300 bg-green-50' : 'border-slate-300',
    disabled ? 'bg-slate-200' : 'bg-white',
  );

  const iconElement = icon && (
    <PassProps
      size='1.1rem'
      color='var(--color-secondary)'>
      {icon}
    </PassProps>
  );

  return (
    <div className={containerClassName}>
      {iconElement && <div className='px-2 items-center'>{iconElement}</div>}
      {children}
    </div>
  );
}
