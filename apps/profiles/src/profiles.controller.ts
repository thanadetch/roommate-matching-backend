import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProfilesService } from './profiles.service';
import {
  CreateProfileDto,
  UpdateProfileDto,
  GetProfileDto,
  GetProfileByEmailDto,
  GetProfilesBatchDto,
  ProfileResponseDto,
  ProfilesListResponse,
} from './dto';
import { Profile } from '../generated/prisma';

@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @GrpcMethod('ProfilesService', 'GetProfiles')
  async getProfiles(): Promise<ProfilesListResponse> {
    return this.profilesService.getProfiles();
  }

  @GrpcMethod('ProfilesService', 'CreateProfile')
  async createProfile(data: CreateProfileDto): Promise<ProfileResponseDto> {
    return this.profilesService.createProfile(data);
  }

  @GrpcMethod('ProfilesService', 'UpdateProfile')
  async updateProfile(data: UpdateProfileDto): Promise<ProfileResponseDto> {
    const { id, ...updateData } = data;
    return this.profilesService.updateProfile(id!, updateData);
  }

  @GrpcMethod('ProfilesService', 'GetProfileById')
  async getProfileById(
    data: GetProfileDto,
  ): Promise<ProfileResponseDto | null> {
    return this.profilesService.getProfile(data.id);
  }

  @GrpcMethod('ProfilesService', 'GetProfileByEmail')
  async getProfileByEmail(
    data: GetProfileByEmailDto,
  ): Promise<ProfileResponseDto | null> {
    return this.profilesService.getProfileByEmail(data);
  }

  @GrpcMethod('ProfilesService', 'GetProfileByEmailWithPassword')
  async getProfileByEmailWithPassword(
    data: GetProfileByEmailDto,
  ): Promise<Profile | null> {
    return this.profilesService.getProfileByEmail(data, false);
  }

  @GrpcMethod('ProfilesService', 'GetProfilesByIds')
  async getProfilesByIds(
    data: GetProfilesBatchDto,
  ): Promise<ProfilesListResponse> {
    return this.profilesService.getProfilesByIds(data);
  }
}
