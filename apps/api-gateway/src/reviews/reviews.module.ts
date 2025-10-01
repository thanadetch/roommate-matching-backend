import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from '../../config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REVIEWS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [config.rabbitmqUrl],
          queue: process.env.REVIEWS_QUEUE_NAME,
        },
      },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
