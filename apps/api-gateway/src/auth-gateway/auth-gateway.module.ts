import { Module } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { AuthGatewayController } from './auth-gateway.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL', '')],
            queue: config.get<string>('AUTH_QUEUE_NAME', 'auth_queue'),
          },
        }),
      },
    ]),
  ],
  controllers: [AuthGatewayController],
  providers: [AuthGatewayService, JwtStrategy, LocalStrategy],
})
export class AuthGatewayModule {}
