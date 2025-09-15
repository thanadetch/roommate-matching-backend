import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {
  }

  async getHello(): Promise<string> {
    const results = await this.prisma.profile.findMany();
    console.log(results);
    return 'Hello World Profiles!';
  }
}
