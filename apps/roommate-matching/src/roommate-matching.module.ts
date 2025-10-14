import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RoommateMatchingController } from './roommate-matching.controller';
import { RoommateMatchingService } from './roommate-matching.service';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/roommate-matching/.env',
    }),
    ClientsModule.register([
      {
        name: 'ROOMS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'rooms_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [RoommateMatchingController],
  providers: [RoommateMatchingService, PrismaService],
})
export class RoommateMatchingModule {}
