import { Module } from '@nestjs/common';
import { NotificationsGatewayService } from './notifications-gateway.service';
import { NotificationsGatewayController } from './notifications-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATIONS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL', '')],
            queue: config.get<string>(
              'NOTIFICATIONS_QUEUE_NAME',
              'notifications_queue',
            ),
          },
        }),
      },
    ]),
  ],
  controllers: [NotificationsGatewayController],
  providers: [NotificationsGatewayService],
})
export class NotificationsGatewayModule {}
