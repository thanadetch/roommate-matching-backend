import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/reviews/.env',
    }),
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
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService],
})
export class ReviewsModule {}
