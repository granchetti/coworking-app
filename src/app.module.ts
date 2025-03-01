import { Module } from '@nestjs/common';
import { HotDeskController } from './core/ui/controllers/hotdesk.controller';
import { MeetingRoomController } from './core/ui/controllers/meeting-room.controller';
import { OfficeController } from './core/ui/controllers/office.controller';

@Module({
  imports: [],
  controllers: [HotDeskController, MeetingRoomController, OfficeController],
  providers: [],
})
export class AppModule {}
