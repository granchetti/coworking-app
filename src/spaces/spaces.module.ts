import { Module } from '@nestjs/common';
import { HotDeskController } from './ui/controllers/hotdesk.controller';
import { MeetingRoomController } from './ui/controllers/meeting-room.controller';
import { OfficeController } from './ui/controllers/office.controller';

@Module({
  controllers: [HotDeskController, MeetingRoomController, OfficeController],
})
export class SpacesModule {}
