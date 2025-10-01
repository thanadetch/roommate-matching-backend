import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROFILES_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'profiles',
          protoPath: 'libs/photos/src/profiles.proto',
          url: 'localhost:3001',
        },
      },
    ]),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
