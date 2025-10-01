import { Controller, Get } from '@nestjs/common';
import { Profile } from 'apps/profiles/generated/prisma';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  getProfiles(): Promise<{ results: Profile[] }> {
    return this.profilesService.getProfiles();
  }
}
