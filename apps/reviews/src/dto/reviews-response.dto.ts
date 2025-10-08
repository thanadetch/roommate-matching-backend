import { Review } from '../../generated/prisma';
import { Profile } from 'apps/profiles/generated/prisma';

export interface ReviewWithProfile extends Review {
  revieweeProfile?: Profile;
}

export interface ReviewsResponse {
  results: ReviewWithProfile[];
}
