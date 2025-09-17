import { Controller } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Profile, Prisma } from '../generated/prisma';

@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @GrpcMethod('ProfilesService', 'GetProfiles')
  getProfiles(): Promise<{ results: Profile[] }> {
    return this.profilesService.getProfiles();
  }

  @GrpcMethod('ProfilesService', 'CreateProfile')
  createProfile(data: Prisma.ProfileCreateInput): Promise<Profile> {
    return this.profilesService.createProfile(data);
  }

  @GrpcMethod('ProfilesService', 'UpdateProfile')
  updateProfile({
    id,
    data,
  }: {
    id: string;
    data: Prisma.ProfileUpdateInput;
  }): Promise<Profile> {
    return this.profilesService.updateProfile(id, data);
  }
}
