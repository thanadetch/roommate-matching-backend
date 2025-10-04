import { Module } from '@nestjs/common';
import { RoommateMatchingGatewayService } from './roommate-matching-gateway.service';
import { RoommateMatchingGatewayController } from './roommate-matching-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
  controllers: [RoommateMatchingGatewayController],
  providers: [RoommateMatchingGatewayService],
})
export class RoommateMatchingGatewayModule {}
