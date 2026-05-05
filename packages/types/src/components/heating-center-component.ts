import { EventType } from '../events';
import { Component, type ExtendedComponentProps } from './component';
import { ComponentType } from './component-type';

export enum HeatingCenterType {
  OIL = 'oil',
  DISTRICT = 'district',
  ELECTRIC = 'electric',
  GROUND = 'ground',
  PELLET = 'pellet',
  HVAC = 'hvac',
}

export type HeatingCenterProps = ExtendedComponentProps & {
  heatingType: HeatingCenterType;
};

export class HeatingProviderComponent extends Component {
  public readonly heatingType: HeatingCenterType;
  constructor({ id, children, heatingType }: HeatingCenterProps) {
    super({
      children,
      id,
      type: ComponentType.HEATING_PROVIDER,
      validChildTypes: [ComponentType.THERMOSTAT],
      validEventTypes: [EventType.REMOVAL, EventType.REPLACEMENT],
    });
    this.heatingType = heatingType;
  }
}
