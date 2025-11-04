import { Module } from '@nestjs/common';
import { ProfilesGatewayService } from './profiles-gateway.service';
import { ProfilesGatewayController } from './profiles-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PROFILES_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'profiles',
            protoPath: 'libs/photos/src/profiles.proto',
            url:
              configService.get<string>('PROFILES_GRPC_URL') ||
              'localhost:5001',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ProfilesGatewayController],
  providers: [ProfilesGatewayService],
})
export class ProfilesGatewayModule {}
