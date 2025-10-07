import { Review } from '../../generated/prisma';

export interface ReviewsResponse {
  results: Review[];
}
