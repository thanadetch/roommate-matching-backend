import { Module } from '@nestjs/common';
import { RoomsGatewayService } from './rooms-gateway.service';
import { RoomsGatewayController } from './rooms-gateway.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ROOMS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL', '')],
            queue: config.get<string>('ROOM_QUEUE_NAME', 'rooms_queue'),
          },
        }),
      },
    ]),
  ],
  controllers: [RoomsGatewayController],
  providers: [RoomsGatewayService],
})
export class RoomsGatewayModule {}
