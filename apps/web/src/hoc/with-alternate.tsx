import type { ReactNode } from 'react';

export function withAlternate<PropsT extends React.PropsWithChildren>(Component: React.FC<PropsT>) {
  return ({
    children,
    showAlternate,
    alternate,
    ...props
  }: PropsT & { showAlternate: boolean; alternate: ReactNode }) => {
    return (
      <Component {...(props as unknown as PropsT)}>
        {showAlternate ? alternate : children}
      </Component>
    );
  };
}
