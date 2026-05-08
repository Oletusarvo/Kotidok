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
  [ComponentType.MATERIAL]: 'Materiaali',
  [ComponentType.SAUNA]: 'Sauna',
  [ComponentType.HALLWAY]: 'Käytävä',
  [ComponentType.ROOF]: 'Katto',
  [ComponentType.DRAINAGE_DITCH]: 'Salaoja',
  [ComponentType.LOCK]: 'Lukko',
};

export const roomTypeNameMap = {
  bathroom: 'Kylpyhuone',
  kitchen: 'Keittiö',
};

export const heatingTypeNameMap = {
  district: 'Kaukolämpö',
  oil: 'Öljy',
  electric: 'Sähkö',
  ground: 'Maalämpö',
  HVAC: 'Ilmalämpöpumppu',
  pellet: 'Pelletti',
};

export const roofTypeNameMap = {
  auma: 'Aumakatto',
  flat: 'Tasakatto',
};
