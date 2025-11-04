import { Module } from '@nestjs/common';
import { RoommateMatchingController } from './roommate-matching.controller';
import { RoommateMatchingService } from './roommate-matching.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/roommate-matching/.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'ROOMS_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>('RABBITMQ_URL') ||
                'amqp://localhost:5672',
            ],
            queue:
              configService.get<string>('ROOM_QUEUE_NAME') || 'rooms_queue',
          },
        }),
      },
      {
        name: 'NOTIFICATIONS_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>('RABBITMQ_URL') ||
                'amqp://localhost:5672',
            ],
            queue:
              configService.get<string>('NOTIFICATIONS_QUEUE_NAME') ||
              'notifications_queue',
          },
        }),
      },
      {
        name: 'PROFILES_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'profiles',
            protoPath: 'libs/photos/src/profiles.proto',
            url:
              configService.get<string>('PROFILES_GRPC_URL') ||
              'localhost:5001',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [RoommateMatchingController],
  providers: [RoommateMatchingService, PrismaService],
})
export class RoommateMatchingModule {}
