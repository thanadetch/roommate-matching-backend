import { Controller, Get } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {
  }

  @Get()
  getHello(): Promise<string> {
    return this.profilesService.getHello();
  }
}
