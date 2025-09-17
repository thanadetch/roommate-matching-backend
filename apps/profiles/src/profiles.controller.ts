import { Controller } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Profile } from '../generated/prisma/client';

@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @GrpcMethod('ProfilesService', 'GetProfiles')
  GetProfiles(): Promise<{ results: Profile[] }> {
    return this.profilesService.getProfiles();
  }
}
