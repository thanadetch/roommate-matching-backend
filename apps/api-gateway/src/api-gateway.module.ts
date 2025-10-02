import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationsGatewayModule } from './notifications-gateway/notifications-gateway.module';
import { ProfilesGatewayModule } from './profiles-gateway/profiles-gateway.module';
import { ReviewsGatewayModule } from './reviews-gateway/reviews-gateway.module';
import { RoommateMatchingGatewayModule } from './roommate-matching-gateway/roommate-matching-gateway.module';
import { RoomsGatewayModule } from './rooms-gateway/rooms-gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api-gateway/.env',
    }),
    NotificationsGatewayModule,
    ProfilesGatewayModule,
    ReviewsGatewayModule,
    RoommateMatchingGatewayModule,
    RoomsGatewayModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
