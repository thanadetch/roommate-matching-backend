import { Module } from '@nestjs/common';
import { RoommateMatchingService } from './roommate-matching.service';
import { RoommateMatchingController } from './roommate-matching.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from '../../config/config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ROOMMATE_MATCHING_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL', '')],
            queue: config.get<string>(
              'ROOMMATE_MATCHING_QUEUE_NAME',
              'roommate_matching_queue',
            ),
          },
        }),
      },
    ]),
  ],
  controllers: [RoommateMatchingController],
  providers: [RoommateMatchingService],
})
export class RoommateMatchingModule {}
