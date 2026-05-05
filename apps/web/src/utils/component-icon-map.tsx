import { ComponentType } from '@kotidok/types';
import {
  Bath,
  Blocks,
  Box,
  DoorOpen,
  Flame,
  Grid2X2,
  Heater,
  Layers,
  Layers2,
  Lock,
  ShowerHead,
  Square,
  Toilet,
} from 'lucide-react';
import type { ReactNode } from 'react';

export const componentIconMap: { [x: string]: ReactNode } = {
  [ComponentType.HEATING_PROVIDER]: <Flame />,
  [ComponentType.HEATING_DISTRIBUTOR]: <Heater />,
  [ComponentType.ROOM]: <Box />,
  [ComponentType.LOCK]: <Lock />,
  [ComponentType.PROPERTY]: <Layers2 />,
  [ComponentType.TOILET]: <Toilet />,
  [ComponentType.WINDOW]: <Grid2X2 />,
  [ComponentType.DOOR]: <DoorOpen />,
  [ComponentType.MATERIAL]: <Blocks />,
  [ComponentType.STOVE]: <Heater />,
  [ComponentType.SINK]: <ShowerHead />,
};
