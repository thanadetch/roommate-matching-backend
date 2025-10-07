import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateReviewDto,
  UpdateReviewDto,
  GetReviewsDto,
  ReviewsResponse,
} from '../../../reviews/src/dto';
import { Review } from '../../../reviews/generated/prisma';

@Injectable()
export class ReviewsGatewayService {
  constructor(
    @Inject('REVIEWS_SERVICE') private readonly reviewsClient: ClientProxy,
  ) {}

  createReview(
    reviewerId: string,
    createReviewDto: CreateReviewDto,
  ): Observable<Review> {
    return this.reviewsClient.send('reviews.create', {
      reviewerId,
      ...createReviewDto,
    });
  }

  getReviews(filters?: GetReviewsDto): Observable<ReviewsResponse> {
    return this.reviewsClient.send('reviews.findAll', filters || {});
  }

  getReviewById(id: string): Observable<Review> {
    return this.reviewsClient.send('reviews.findOne', { id });
  }

  updateReview(
    id: string,
    reviewerId: string,
    updateReviewDto: UpdateReviewDto,
  ): Observable<Review> {
    return this.reviewsClient.send('reviews.update', {
      id,
      reviewerId,
      ...updateReviewDto,
    });
  }

  deleteReview(id: string, reviewerId: string): Observable<Review> {
    return this.reviewsClient.send('reviews.remove', { id, reviewerId });
  }

  getReviewsByUser(userId: string): Observable<ReviewsResponse> {
    return this.reviewsClient.send('reviews.findByUser', { userId });
  }

  getReviewsForUser(userId: string): Observable<ReviewsResponse> {
    return this.reviewsClient.send('reviews.findForUser', { userId });
  }
}
