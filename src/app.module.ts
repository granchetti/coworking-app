import { Module } from '@nestjs/common';
import { HotDeskController } from './core/ui/controllers/hotdesk.controller';

@Module({
  imports: [],
  controllers: [HotDeskController],
  providers: [],
})
export class AppModule {}
