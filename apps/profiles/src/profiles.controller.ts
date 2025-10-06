import { Controller } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from '../generated/prisma';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateProfileDto,
  UpdateProfileDto,
  GetProfileByEmailDto,
  GetProfileByIdDto,
} from './dto';

@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @GrpcMethod('ProfilesService', 'GetProfiles')
  getProfiles(_: object): Promise<{ results: Profile[] }> {
    return this.profilesService.getProfiles(_);
  }

  @GrpcMethod('ProfilesService', 'CreateProfile')
  createProfile(data: CreateProfileDto): Promise<Profile> {
    return this.profilesService.createProfile(data);
  }

  @GrpcMethod('ProfilesService', 'UpdateProfile')
  updateProfile(data: UpdateProfileDto & { id: string }): Promise<Profile> {
    return this.profilesService.updateProfile(data.id, data);
  }

  @GrpcMethod('ProfilesService', 'GetProfileById')
  getProfile(data: GetProfileByIdDto): Promise<Profile | null> {
    return this.profilesService.getProfile(data.id);
  }

  @GrpcMethod('ProfilesService', 'GetProfileByEmail')
  getProfileByEmail(data: GetProfileByEmailDto): Promise<Profile | null> {
    return this.profilesService.getProfileByEmail(data);
  }
}
