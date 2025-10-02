import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { ProfilesService } from '../../../profiles/src/profiles.service';
import { Profile } from 'apps/profiles/generated/prisma';

@Injectable()
export class ProfilesGatewayService implements OnModuleInit {
  private profilesService: ProfilesService;

  constructor(@Inject('PROFILES_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.profilesService =
      this.client.getService<ProfilesService>('ProfilesService');
  }

  getProfiles(): Promise<{ results: Profile[] }> {
    return this.profilesService.getProfiles();
  }
}
