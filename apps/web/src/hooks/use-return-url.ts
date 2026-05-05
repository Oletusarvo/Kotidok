import { useSearchParams } from 'react-router-dom';

export function useReturnUrl() {
  const [params] = useSearchParams();
  return params?.get('return-url');
}
