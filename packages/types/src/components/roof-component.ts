import { Component, type ExtendedComponentProps } from './component';
import { ComponentType } from './component-type';

export type RoofComponentProps = ExtendedComponentProps & {};

/**A component for representing the roof of a building. */
export class RoofComponent extends Component {
  constructor({ id }: RoofComponentProps) {
    super({ id, type: ComponentType.ROOF });
  }
}
