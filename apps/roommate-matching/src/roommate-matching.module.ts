import { Module } from '@nestjs/common';
import { RoommateMatchingController } from './roommate-matching.controller';
import { RoommateMatchingService } from './roommate-matching.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/roommate-matching/.env',
    }),
  ],
  controllers: [RoommateMatchingController],
  providers: [RoommateMatchingService],
})
export class RoommateMatchingModule {}
