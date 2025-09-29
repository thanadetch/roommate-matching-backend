import { NestFactory } from '@nestjs/core';
import { RoomsModule } from './rooms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RoomsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || ''],
        queue: 'rooms_queue',
      },
    },
  );
  await app.listen();
}
bootstrap();
