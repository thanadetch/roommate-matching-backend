import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RoommateMatchingController } from './roommate-matching.controller';
import { RoommateMatchingService } from './roommate-matching.service';
import { PrismaService } from './prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/roommate-matching/.env',
    }),
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
    ClientsModule.register([
      {
        name: 'PROFILES_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'profiles',
          protoPath: 'libs/photos/src/profiles.proto',
        },
      },
    ]),
  ],
  controllers: [RoommateMatchingController],
  providers: [RoommateMatchingService, PrismaService],
})
export class RoommateMatchingModule {}
