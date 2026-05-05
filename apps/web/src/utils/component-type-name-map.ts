import { ComponentType } from '@kotidok/types';

export const componentTypeNameMap = {
  [ComponentType.PROPERTY]: 'Kiinteistö',
  [ComponentType.ROOM]: 'Huone',
  [ComponentType.SINK]: 'Lavuaari',
  [ComponentType.TOILET]: 'Pönttö',
  [ComponentType.STOVE]: 'Kiuas',
  [ComponentType.DOOR]: 'Ovi',
  [ComponentType.WINDOW]: 'Ikkuna',
  [ComponentType.HEATING_PROVIDER]: 'Lämmityskeskus',
  [ComponentType.HEATING_DISTRIBUTOR]: 'Lämmönjakaja',
  [ComponentType.WALLPAPER]: 'Tapetti',
  [ComponentType.PAINT]: 'Maali',
};
