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
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'profiles',
            protoPath: 'libs/photos/src/profiles.proto',
            url: `localhost:${config.get<string>('PROFILE_PORT', '3001')}`,
          },
        }),
      },
    ]),
  ],
  controllers: [ProfilesGatewayController],
  providers: [ProfilesGatewayService],
})
export class ProfilesGatewayModule {}
