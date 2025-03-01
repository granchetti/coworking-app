import { Module } from '@nestjs/common';
import { HotDeskController } from './spaces/ui/controllers/hotdesk.controller';
import { MeetingRoomController } from './spaces/ui/controllers/meeting-room.controller';
import { OfficeController } from './spaces/ui/controllers/office.controller';

@Module({
  imports: [],
  controllers: [HotDeskController, MeetingRoomController, OfficeController],
  providers: [],
})
export class AppModule {}
