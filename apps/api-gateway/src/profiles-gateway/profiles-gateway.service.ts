import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ProfilesGrpcService, ProfilesList } from '@app/common';
import { Profile } from 'apps/profiles/generated/prisma';
import { CreateProfileDto, UpdateProfileDto } from 'apps/profiles/src/dto';

@Injectable()
export class ProfilesGatewayService implements OnModuleInit {
  private profilesService: ProfilesGrpcService;

  constructor(@Inject('PROFILES_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.profilesService =
      this.client.getService<ProfilesGrpcService>('ProfilesService');
  }

  getProfiles(): Observable<ProfilesList> {
    return this.profilesService.getProfiles({});
  }

  createProfile(data: CreateProfileDto): Observable<Profile> {
    return this.profilesService.createProfile(data);
  }

  updateProfile(data: UpdateProfileDto): Observable<Profile> {
    return this.profilesService.updateProfile(data);
  }

  getProfileById(id: string): Observable<Profile> {
    return this.profilesService.getProfileById({ id });
  }

  getProfileByEmail(email: string): Observable<Profile> {
    return this.profilesService.getProfileByEmail({ email });
  }

  deleteProfile(id: string): Observable<Profile> {
    return this.profilesService.deleteProfile({ id });
  }
}
