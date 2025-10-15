import { NestFactory } from '@nestjs/core';
import { RoomsModule } from './rooms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RoomsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: process.env.QUEUE_NAME || 'rooms_queue',
      },
    },
  );

  await app.listen();
}

bootstrap();
