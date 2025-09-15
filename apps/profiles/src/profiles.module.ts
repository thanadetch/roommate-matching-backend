import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './apps/profiles/.env',
  })],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
