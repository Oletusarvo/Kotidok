import { Component, type ExtendedComponentProps } from './component';
import { ComponentType } from './component-type';
import {
  HeatingDistributorComponent,
  HeatingDistributorType,
  type HeatingDistributorProps,
} from './heating-distributor-component';

export type RadiatorProps = Omit<
  HeatingDistributorProps,
  'validChildTypes' | 'validEventTypes' | 'heatingDistributorType'
>;

export class RadiatorComponent extends HeatingDistributorComponent {
  constructor({ id }: RadiatorProps) {
    super({
      id,
      validChildTypes: [ComponentType.THERMOSTAT],
      heatingDistributorType: HeatingDistributorType.RADIATOR,
    });
  }
}
