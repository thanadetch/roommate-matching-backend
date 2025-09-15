import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './apps/rooms/.env',
  })],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {
}
