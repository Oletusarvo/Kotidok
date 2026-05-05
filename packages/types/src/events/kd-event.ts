export enum EventType {
  REPLACEMENT = 'replacement',
  SERVICE = 'service',
  REMOVAL = 'removal',
  INSTALLATION = 'installation',
}

export class KDEvent {
  public readonly id: string;
  public readonly title: string;
  public readonly type: EventType;
  constructor(props: { id: string; title: string; type: EventType }) {
    const { title, id, type } = props;
    this.title = title;
    this.id = id;
    this.type = type;
  }
}
