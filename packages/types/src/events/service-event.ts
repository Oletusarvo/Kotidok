import { EventType, KDEvent } from './kd-event';

/**A wrapper instantiating a KDEvent with the SERVICE event type. */
export class ServiceEvent extends KDEvent {
  constructor(props: { id: string; title: string }) {
    const { id, title } = props;
    super({ title, id, type: EventType.SERVICE });
  }
}
