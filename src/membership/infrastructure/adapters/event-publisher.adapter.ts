import { IEventPublisher } from '../../domain/ports/event-publisher.interface';

export class EventPublisherAdapter implements IEventPublisher {
  async publish(event: any): Promise<void> {
    console.log('Event published:', event);
  }
}
