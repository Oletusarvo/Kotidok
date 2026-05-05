import { Spinner } from '../components/spinner';
import { withAlternate } from './with-alternate';

export function withLoader<PropsT extends React.PropsWithChildren>(Component: React.FC<PropsT>) {
  return ({ children, loading, ...props }: PropsT & { loading: boolean }) => {
    const EnchancedComponent = withAlternate(Component);
    return (
      <EnchancedComponent
        {...(props as unknown as PropsT)}
        showAlternate={loading}
        alternate={<Spinner />}>
        {children}
      </EnchancedComponent>
    );
  };
}
