import { Controller, Get } from '@nestjs/common';
import { ProfilesGatewayService } from './profiles-gateway.service';
import { Profile } from 'apps/profiles/generated/prisma';

@Controller('profiles')
export class ProfilesGatewayController {
  constructor(
    private readonly profilesGatewayService: ProfilesGatewayService,
  ) {}

  @Get()
  getProfiles(): Promise<{ results: Profile[] }> {
    return this.profilesGatewayService.getProfiles();
  }
}
