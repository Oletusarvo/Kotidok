import { EventType, KDEvent } from './kd-event';

/**A wrapper initializing a KDEvent with the REPLACEMENT event type. */
export class ReplacementEvent extends KDEvent {
  public readonly previousComponentId: string;
  constructor(props: { id: string; title: string; previousComponentId: string }) {
    const { id, title, previousComponentId } = props;
    super({ id, title, type: EventType.REPLACEMENT });
    this.previousComponentId = previousComponentId;
  }
}
