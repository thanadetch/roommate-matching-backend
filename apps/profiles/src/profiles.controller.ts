import { Controller, Get } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Profile } from '../generated/prisma/client';

@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  getHello(): Promise<string> {
    return this.profilesService.getHello();
  }

  @GrpcMethod('ProfilesService', 'GetProfiles')
  GetProfiles(): Promise<{ results: Profile[] }> {
    return this.profilesService.getProfiles();
  }
}
