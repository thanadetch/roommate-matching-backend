import { NestFactory } from '@nestjs/core';
import { RoommateMatchingModule } from './roommate-matching.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RoommateMatchingModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || ''],
        queue: process.env.QUEUE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
