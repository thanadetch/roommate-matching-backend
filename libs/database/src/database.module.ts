import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaService } from '@app/database/prisma.service';

@Module({
  providers: [DatabaseService, PrismaService],
  exports: [DatabaseService, PrismaService],
})
export class DatabaseModule {
}
