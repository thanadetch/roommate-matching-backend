import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World Profiles!';
  }
}
