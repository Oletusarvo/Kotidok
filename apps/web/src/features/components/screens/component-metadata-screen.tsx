import { useNavigate } from 'react-router-dom';
import { Modal } from '../../../components/modal';
import { useComponent } from '../providers/component-provider';
import { ComponentType } from '@kotidok/types';
import {
  componentTypeNameMap,
  heatingTypeNameMap,
  roofTypeNameMap,
  roomTypeNameMap,
} from '../../../utils/name-maps/component-type-name-map';
import { componentTypeMap } from './component-name-map';
import { componentIconMap } from '../../../utils/component-icon-map';
import { PassProps } from '../../../components/pass-props';
import { Box } from 'lucide-react';

export function ComponentMetadataScreen() {
  const navigate = useNavigate();
  const { component } = useComponent();
  const getMetadata = () => {
    const type = component.component_type;
    switch (type) {
      case ComponentType.PROPERTY:
        return <PropertyMetadata />;

      case ComponentType.ROOM:
        return <RoomMetadata />;

      case ComponentType.HEATING_PROVIDER:
        return <HeatingProviderMetadata />;

      case ComponentType.ROOF:
        return <RoofMetadata />;
      case ComponentType.TOILET:
        return <ToiletMetadata />;
      default:
        return <span>Näet tästä komponentin tekniset tiedot.</span>;
    }
  };

  const icon = componentIconMap[component.component_type] || <Box />;
  const iconElement = (
    <PassProps
      size='1.2rem'
      color='var(--color-secondary)'>
      {icon}
    </PassProps>
  );
  return (
    <Modal
      title={'Komponentin tiedot'}
      onClose={() => navigate(-1)}>
      <div className='flex-col gap-4'>
        <div className='w-full flex-row items-center p-2 rounded-md border border-blue-500/20 bg-blue-500/10 gap-4'>
          {iconElement}
          <div className='flex-col'>
            <span className='text-sm font-semibold'>{component.name}</span>
            <span className='text-sm font-mono text-slate-500'>{component.id}</span>
          </div>
        </div>
        <BaseMetadata>{getMetadata()}</BaseMetadata>
      </div>
    </Modal>
  );
}

function Entry({ label, value }: any) {
  return (
    <div className='flex-col'>
      <span className='text-xs font-semibold text-slate-500'>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function BaseMetadata({ children }: React.PropsWithChildren) {
  const { component } = useComponent();
  return (
    <>
      <Entry
        label='Tyyppi'
        value={
          componentTypeNameMap[component.component_type as keyof typeof componentTypeNameMap] ||
          component.component_type
        }
      />
      {children}
    </>
  );
}

function PropertyMetadata() {
  const { component } = useComponent();
  return (
    <>
      <Entry
        label='Kiinteistötunnus'
        value={component.metadata.cadastral_id || 'Ei määritelty'}
      />
    </>
  );
}

function RoomMetadata() {
  const { component } = useComponent();
  const roomType =
    roomTypeNameMap[component.metadata.roomType as keyof typeof roomTypeNameMap] ||
    component.metadata.roomType;

  return (
    <>
      <Entry
        label='Huonetyyppi'
        value={roomType}
      />
    </>
  );
}

function HeatingProviderMetadata() {
  const { component } = useComponent();
  const heatingType =
    heatingTypeNameMap[component.metadata.heatingType as keyof typeof heatingTypeNameMap] ||
    component.metadata.heatingType;

  return (
    <>
      <Entry
        label='Lämmitystyyppi'
        value={heatingType}
      />
    </>
  );
}

function RoofMetadata() {
  const { component } = useComponent();
  const metadata = component.metadata;
  const roofType =
    roofTypeNameMap[metadata.roofType as keyof typeof roofTypeNameMap] || metadata.roofType;

  return (
    <>
      <Entry
        label='Katon tyyppi'
        value={roofType}
      />

      <Entry
        label='Kaltevuus'
        value={showMetadata(metadata?.incline)}
      />

      <Entry
        label='Materiaali'
        value={showMetadata(metadata?.material)}
      />
    </>
  );
}

function ToiletMetadata() {
  const { component } = useComponent();
  const metadata = component.metadata;

  return (
    <>
      <Entry
        label='Valmistaja'
        value={showMetadata(metadata?.brand)}
      />
    </>
  );
}

const showMetadata = (value?: string | number) => {
  return value || 'Ei määritelty';
};
