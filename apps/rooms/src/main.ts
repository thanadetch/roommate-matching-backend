import { NestFactory } from '@nestjs/core';
import { RoomsModule } from './rooms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(RoomsModule);
  const configService = appContext.get(ConfigService);

  // env.dev
  const rabbitmqUrl = configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672';
  const queueName = configService.get<string>('QUEUE_NAME') || 'rooms_queue';
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(RoomsModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqUrl],
      queue: queueName,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log(`Rooms service is running on RabbitMQ queue: ${queueName}`);

  await appContext.close();
}

bootstrap();
