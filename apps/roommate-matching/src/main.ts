import { NestFactory } from '@nestjs/core';
import { RoommateMatchingModule } from './roommate-matching.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RoommateMatchingModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: process.env.QUEUE_NAME || 'roommate_matching_queue',
      },
    },
  );

  await app.listen();
}

bootstrap();
