import type z from 'zod';
import { setupContext } from '../../../utils/setup-context';
import type { componentSchema } from '@kotidok/schemas';

const [ComponentContext, useComponent] = setupContext<{
  component: any;
}>('ComponentContext');

type ComponentProviderProps = React.PropsWithChildren & {
  component: z.infer<typeof componentSchema>;
};

export function ComponentProvider({ children, component }: ComponentProviderProps) {
  return <ComponentContext.Provider value={{ component }}>{children}</ComponentContext.Provider>;
}

export { useComponent };
