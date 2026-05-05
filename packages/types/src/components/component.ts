import type { EventType, KDEvent } from '../events/kd-event';
import { ComponentType } from './component-type';

export type ComponentProps = {
  children?: Component[];
  metadata?: Record<string, any>;
  type: ComponentType;
  id: string;
  validChildTypes?: ComponentType[];
  validEventTypes?: EventType[];
};

export type ExtendedComponentProps = Omit<
  ComponentProps,
  'type' | 'validChildTypes' | 'validEventTypes'
>;

export class Component {
  public readonly children: Map<string, Component> = new Map();
  public readonly type: ComponentType;
  public readonly id: string;
  public readonly validChildTypes: ComponentType[];
  public readonly validEventTypes: EventType[];
  public readonly metadata?: Record<string, any>;
  private m_events: KDEvent[] = [];

  constructor({
    children = [],
    type,
    id,
    metadata,
    validChildTypes = [],
    validEventTypes = [],
  }: ComponentProps) {
    this.type = type;
    this.id = id;
    this.validChildTypes = validChildTypes;
    this.validEventTypes = validEventTypes;
    this.metadata = metadata;
    for (const c of children) {
      this.addChild(c);
    }
  }

  /**Adds a new child for the component. Throws an error if a child with the same id is already present, the child is a property, or its type is not included as a valid child type.*/
  addChild(child: Component) {
    if (this.children.has(child.id)) {
      throw new Error('Duplicate child id!', { cause: child.id });
    } else if (!this.validChildTypes.includes(child.type)) {
      throw new Error('The component cannot have children of this type!', { cause: child });
    } else if (child.type === ComponentType.PROPERTY) {
      throw new Error('A property-component cannot be included as a child!', { cause: child });
    }

    this.children.set(child.id, child);
  }

  /**Adds a new event on the component.*/
  addEvent(event: KDEvent) {
    if (!this.validEventTypes.includes(event.type)) {
      throw new Error('Validation of event type failed!', {
        cause: {
          eventType: event.type,
          validEventTypes: this.validEventTypes,
        },
      });
    }
    this.m_events.push(event);
  }
}
