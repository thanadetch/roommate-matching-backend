import { Module } from '@nestjs/common';
import { ReviewsGatewayService } from './reviews-gateway.service';
import { ReviewsGatewayController } from './reviews-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'REVIEWS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL', '')],
            queue: config.get<string>('REVIEWS_QUEUE_NAME', 'reviews_queue'),
          },
        }),
      },
    ]),
  ],
  controllers: [ReviewsGatewayController],
  providers: [ReviewsGatewayService],
})
export class ReviewsGatewayModule {}
