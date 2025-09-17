import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Profile } from '../generated/prisma';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getProfiles(): Promise<{ results: Profile[] }> {
    const results = await this.prisma.profile.findMany();
    return { results };
  }
}
