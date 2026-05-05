import React, { useMemo } from 'react';

export type PassPropsProps = React.PropsWithChildren & {
  [x: string]: any;
};

export function PassProps({ children, ...props }: PassPropsProps) {
  return useMemo(() => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        const childProps = child.props as any;
        return React.cloneElement(child, {
          ...childProps,
          ...props,
          onClick: props.onClick
            ? (e: any) => {
                props.onClick(e);
                childProps.onClick?.(e);
              }
            : null,
        });
      }
    });
  }, [children]);
}
