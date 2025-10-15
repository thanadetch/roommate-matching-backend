import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RoomsGatewayController } from './rooms-gateway.controller';
import { RoomsGatewayService } from './rooms-gateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api-gateway/.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'ROOMS_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>('RABBITMQ_URL') ||
                'amqp://localhost:5672',
            ],
            queue:
              configService.get<string>('ROOM_QUEUE_NAME') || 'rooms_queue',
            queueOptions: {
              durable: true,
              arguments: { 'x-queue-type': 'classic' },
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [RoomsGatewayController],
  providers: [RoomsGatewayService],
  exports: [RoomsGatewayService],
})
export class RoomsGatewayModule {}
