import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { MeetingRoomReservedEvent } from '../../domain/events/meeting-room-reserved.event';
import { ReserveHotDeskUseCase } from '../use-cases/reserve-hotdesk.use-case';
import { ReserveHotDeskCommand } from '../commands/reserve-hotdesk.command';
import { Injectable } from '@nestjs/common';

@EventsHandler(MeetingRoomReservedEvent)
@Injectable()
export class MeetingRoomReservedEventHandler
  implements IEventHandler<MeetingRoomReservedEvent>
{
  constructor(private readonly reserveHotDeskUseCase: ReserveHotDeskUseCase) {}

  async handle(event: MeetingRoomReservedEvent): Promise<void> {
    const userId = event.userId;
    const reservationDate = event.date;
    const command = new ReserveHotDeskCommand(userId, reservationDate);
    try {
      await this.reserveHotDeskUseCase.execute(command);
      console.log(
        `Hot desk assigned to user ${userId.getValue()} for date ${reservationDate.getValue()}`,
      );
    } catch (error) {
      console.error('Error assigning complimentary hot desk:', error);
    }
  }
}
