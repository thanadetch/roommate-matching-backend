import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  CreateProfileDto,
  UpdateProfileDto,
  GetProfileByEmailDto,
  GetProfilesBatchDto,
  ProfilesListResponse,
  ProfileResponseDto,
} from './dto';
import { Profile } from '../generated/prisma';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getProfiles(): Promise<ProfilesListResponse> {
    const results = await this.prisma.profile.findMany({
      omit: {
        password: true,
      },
    });
    return { results };
  }

  async updateProfile(
    id: string,
    data: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    return this.prisma.profile.update({
      where: { id },
      data,
      omit: {
        password: true,
      },
    });
  }

  async createProfile(data: CreateProfileDto): Promise<ProfileResponseDto> {
    return this.prisma.profile.create({
      data,
      omit: {
        password: true,
      },
    });
  }

  async getProfile(userId: string): Promise<ProfileResponseDto | null> {
    return this.prisma.profile.findUnique({
      where: { id: userId },
      omit: {
        password: true,
      },
    });
  }

  async getProfileByEmail(
    data: GetProfileByEmailDto,
    omitPassword = true,
  ): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { email: data.email },
      omit: {
        password: omitPassword,
      },
    });
  }

  async getProfilesByIds(
    data: GetProfilesBatchDto,
  ): Promise<ProfilesListResponse> {
    const profiles = await this.prisma.profile.findMany({
      where: {
        id: {
          in: data.ids,
        },
      },
      omit: {
        password: true,
      },
    });

    return { results: profiles };
  }
}
