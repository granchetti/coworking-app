import { Module } from '@nestjs/common';
import { HotDeskController } from './core/ui/controllers/hotdesk.controller';
import { MeetingRoomController } from './core/ui/controllers/meeting-room.controller';

@Module({
  imports: [],
  controllers: [HotDeskController, MeetingRoomController],
  providers: [],
})
export class AppModule {}
