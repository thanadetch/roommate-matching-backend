import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Profile, Prisma } from '../generated/prisma';
import { Observable } from 'rxjs';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getProfiles(_: object): Promise<{ results: Profile[] }> {
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

  async getProfile(userId: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { id: userId },
    });
  }

  async getProfileByEmail(data: { email: string }) {
    return this.prisma.profile.findUnique({
      where: { email: data.email },
    });
  }
}
