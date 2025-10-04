import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log('QUEUE_NAME', process.env.QUEUE_NAME);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
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
