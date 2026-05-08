import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { AppScreen } from '../../../components/app-screen';
import { useQuery } from '@tanstack/react-query';
import { apiInterface } from '../../../utils/api-interface';
import { Spinner } from '../../../components/spinner';
import { ArrowLeft, Box, CircleQuestionMark, Info, Pencil } from 'lucide-react';
import { Button, TabButton } from '../../../components/button';
import { componentIconMap } from '../../../utils/component-icon-map';
import { PassProps } from '../../../components/pass-props';
import { ErrorScreen, ErrorScreenWithReturn } from '../../../screens/error-screen';
import { componentTypeNameMap } from '../../../utils/name-maps/component-type-name-map';
import { ComponentType } from '@kotidok/types';
import { ComponentProvider } from '../providers/component-provider';
import { useClassName } from '../../../hooks/use-class-name';

export function ComponentScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    throw new Error('The component screen must have access to an id url-parameter!');
  }

  const { component, isLoading } = useComponentScreen(id);
  const statusBadgeClassName = useClassName(
    'text-xs font-semibold py-1 px-2 border rounded-md',
    !component?.is_active
      ? 'bg-red-500/20 border-red-500/40 text-red-200'
      : 'bg-green-500/20 border-green-500/40 text-green-200',
  );

  if (isLoading) {
    return (
      <div className='flex-col w-full flex-1 justify-center items-center'>
        <Spinner />
      </div>
    );
  } else if (!component) {
    return (
      <ErrorScreenWithReturn
        title='Komponenttia ei löydy!'
        description='Hups! näyttää siltä että valitsemaasi komponenttia ei ole olemassa.'
        icon={<CircleQuestionMark />}
      />
    );
  }

  const icon = componentIconMap[component.component_type] || <Box />;
  const iconInstance = (
    <PassProps
      className='opacity-20 absolute animate-hover'
      size='6rem'
      color='white'>
      {icon}
    </PassProps>
  );

  return (
    <>
      {/*The hero containing as its background image the main image of the component, and displays the components id, name and type. */}
      <div className='w-full bg-linear-to-b from-primary to-amber-700 flex-1 flex-col justify-center items-center relative overflow-hidden'>
        {iconInstance}
        <div className='flex-col w-full justify-between items-start absolute top-0 left-0 h-full p-2'>
          <div className='flex-row items-center w-full justify-between'>
            <Button
              variant='ghost'
              rounded
              onClick={() => {
                if (component.component_type === ComponentType.PROPERTY) {
                  navigate('/auth/properties');
                } else {
                  navigate(`/auth/components/${component.parent_id}/children`);
                }
              }}>
              <ArrowLeft color='white' />
            </Button>

            <div className='rounded-[100px] border border-white/20 bg-white/10 py-2 px-4 items-center'>
              <span className='text-sm font-semibold text-white'>
                {componentTypeNameMap[
                  component.component_type as keyof typeof componentTypeNameMap
                ] || component.component_type}
              </span>
            </div>
          </div>
          <div className='w-full flex-row justify-between items-end'>
            <div className='flex-col items-start'>
              <div className='flex-row items-center gap-2'>
                <span className='text-lg text-white font-semibold overflow-hidden text-ellipsis'>
                  {component.name}
                </span>
                <span className={statusBadgeClassName}>
                  {component.is_active ? 'Aktiivinen' : 'Ei Aktiivinen'}
                </span>
              </div>

              <span className='text-xs font-mono text-white'>{component.id}</span>
            </div>
            <div className='flex-row gap-2 items-center'>
              <Button
                variant='ghost'
                onClick={() => navigate('edit')}
                rounded>
                <Pencil color='white' />
              </Button>
              <Button
                onClick={() => navigate('details')}
                variant='ghost'
                rounded>
                <Info color='white' />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full bg-olive-100 justify-start flex-col flex-3 gap-2 overflow-hidden'>
        <div className='w-full'>
          <TabButton
            selected={location.pathname.endsWith('events')}
            onClick={() => navigate('events')}>
            <span className='text-slate-500'>Tapahtumat ({component.event_count})</span>
          </TabButton>
          <TabButton
            selected={location.pathname.endsWith('children')}
            onClick={() => navigate('children')}>
            <span className='text-slate-500'>Jäsenet ({component.child_count})</span>
          </TabButton>
          <TabButton
            onClick={() => navigate('files')}
            selected={location.pathname.endsWith('files')}>
            <span className='text-slate-500'>Tiedostot</span>
          </TabButton>
        </div>
        <ComponentProvider component={component}>
          <Outlet />
        </ComponentProvider>
      </div>
    </>
  );
}

function useComponentScreen(id: string) {
  const { data: component, isLoading } = useQuery({
    queryKey: ['component', id],
    queryFn: async () => {
      const res = await apiInterface.getComponentById(id);
      return res.status === 200 ? await res.json() : null;
    },
  });

  return { component, isLoading };
}
