import { useMemo } from 'react';

export function useClassName(...className: string[]) {
  return useMemo(() => className.join(' ').trim(), [className]);
}
