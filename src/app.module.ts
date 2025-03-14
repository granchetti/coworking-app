import { Module } from '@nestjs/common';
import { MembershipModule } from './membership/membership.module';
import { SpacesModule } from './spaces/spaces.module';

@Module({
  imports: [MembershipModule, SpacesModule],
})
export class AppModule {}
