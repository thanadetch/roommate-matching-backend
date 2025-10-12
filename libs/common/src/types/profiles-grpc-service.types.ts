// gRPC Service Interface for Profiles service
import { Observable } from 'rxjs';
import { Profile } from 'apps/profiles/generated/prisma';
import { CreateProfileDto, UpdateProfileDto } from 'apps/profiles/src/dto';

export interface ProfileId {
  id: string;
}

export interface ProfileEmail {
  email: string;
}

export interface ProfileIds {
  ids: string[];
}

export interface ProfilesList {
  results: Profile[];
}

export interface Empty {
  // Empty interface for gRPC calls that don't require parameters
  [key: string]: never;
}

export interface ProfileResponse {
  result?: Profile;
}

export interface ProfilesGrpcService {
  createProfile(profile: CreateProfileDto): Observable<Profile>;
  getProfileById(data: ProfileId): Observable<ProfileResponse>;
  getProfileByEmail(data: ProfileEmail): Observable<ProfileResponse>;
  getProfileByEmailWithPassword(
    data: ProfileEmail,
  ): Observable<ProfileResponse>;
  getProfilesByIds(data: ProfileIds): Observable<ProfilesList>;
  updateProfile(profile: UpdateProfileDto): Observable<Profile>;
  deleteProfile(data: ProfileId): Observable<Profile>;
  getProfiles(data: Empty): Observable<ProfilesList>;
}
