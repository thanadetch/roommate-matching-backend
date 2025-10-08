import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/reviews/.env',
    }),
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
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService],
})
export class ReviewsModule {}
