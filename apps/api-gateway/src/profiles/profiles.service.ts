import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Profile } from 'apps/profiles/generated/prisma';

@Injectable()
export class ProfilesService implements OnModuleInit {
  private profilesService: ProfilesService;

  constructor(@Inject('PROFILES_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.profilesService =
      this.client.getService<ProfilesService>('ProfilesService');
  }

  getProfiles(): Promise<{ results: Profile[] }> {
    console.log(process.env.RABBITMQ_URL);
    return this.profilesService.getProfiles();
  }
}
