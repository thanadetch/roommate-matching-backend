import { Module } from '@nestjs/common';
import { RoommateMatchingService } from './roommate-matching.service';
import { RoommateMatchingController } from './roommate-matching.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from '../../config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ROOMMATE_MATCHING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [config.rabbitmqUrl],
          queue: process.env.ROOMMATE_MATCHING_QUEUE_NAME,
        },
      },
    ]),
  ],
  controllers: [RoommateMatchingController],
  providers: [RoommateMatchingService],
})
export class RoommateMatchingModule {}
