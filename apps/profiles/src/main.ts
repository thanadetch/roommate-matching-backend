import { NestFactory } from '@nestjs/core';
import { ProfilesModule } from './profiles.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProfilesModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'profiles',
        protoPath: 'libs/photos/src/profiles.proto',
        url: process.env.GRPC_URL,
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
