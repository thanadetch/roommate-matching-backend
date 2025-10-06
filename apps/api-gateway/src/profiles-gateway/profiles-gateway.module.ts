import { Module } from '@nestjs/common';
import { ProfilesGatewayService } from './profiles-gateway.service';
import { ProfilesGatewayController } from './profiles-gateway.controller';
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
        },
      },
    ]),
  ],
  controllers: [ProfilesGatewayController],
  providers: [ProfilesGatewayService],
})
export class ProfilesGatewayModule {}
