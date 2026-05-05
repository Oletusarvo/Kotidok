import { Component, type ComponentProps } from './component';
import { ComponentType } from './component-type';

export enum HeatingDistributorType {
  RADIATOR = 'radiator',
}

export type HeatingDistributorProps = Omit<ComponentProps, 'type'> & {
  heatingDistributorType: HeatingDistributorType;
};

export class HeatingDistributorComponent extends Component {
  public readonly heatingDistributorType: HeatingDistributorType;
  constructor({
    id,
    heatingDistributorType,
    validChildTypes,
    validEventTypes,
  }: HeatingDistributorProps) {
    super({ id, type: ComponentType.HEATING_DISTRIBUTOR, validChildTypes, validEventTypes });
    this.heatingDistributorType = heatingDistributorType;
  }
}
