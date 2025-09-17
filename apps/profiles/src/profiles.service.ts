import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Profile, Prisma } from '../generated/prisma';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getProfiles(): Promise<{ results: Profile[] }> {
    const results = await this.prisma.profile.findMany();
    return { results };
  }

  async updateProfile(
    id: string,
    data: Prisma.ProfileUpdateInput,
  ): Promise<Profile> {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  async createProfile(data: Prisma.ProfileCreateInput): Promise<Profile> {
    return this.prisma.profile.create({
      data,
    });
  }
}
