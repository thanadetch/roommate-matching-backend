import { Profile } from '../../generated/prisma';

export type ProfileResponseDto = Omit<Profile, 'password'>;

export interface ProfilesListResponse {
  results: ProfileResponseDto[];
}
