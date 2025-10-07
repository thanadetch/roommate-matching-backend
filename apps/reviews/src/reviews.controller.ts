import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto, GetReviewsDto } from './dto';
import { Review } from '../generated/prisma';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @MessagePattern('reviews.create')
  async createReview(
    @Payload() data: CreateReviewDto & { reviewerId: string },
  ): Promise<Review> {
    const { reviewerId, ...createReviewDto } = data;
    return this.reviewsService.createReview(reviewerId, createReviewDto);
  }

  @MessagePattern('reviews.findAll')
  async getReviews(
    @Payload() data: GetReviewsDto,
  ): Promise<{ results: Review[] }> {
    const results = await this.reviewsService.getReviews(data);
    return { results };
  }

  @MessagePattern('reviews.findOne')
  async getReviewById(@Payload() data: { id: string }): Promise<Review> {
    return this.reviewsService.getReviewById(data.id);
  }

  @MessagePattern('reviews.update')
  async updateReview(
    @Payload() data: UpdateReviewDto & { id: string; reviewerId: string },
  ): Promise<Review> {
    const { id, reviewerId, ...updateReviewDto } = data;
    return this.reviewsService.updateReview(id, reviewerId, updateReviewDto);
  }

  @MessagePattern('reviews.remove')
  async deleteReview(
    @Payload() data: { id: string; reviewerId: string },
  ): Promise<Review> {
    return this.reviewsService.deleteReview(data.id, data.reviewerId);
  }

  @MessagePattern('reviews.findByUser')
  async getReviewsByUser(
    @Payload() data: { userId: string },
  ): Promise<{ results: Review[] }> {
    const results = await this.reviewsService.getReviewsByUser(data.userId);
    return { results };
  }

  @MessagePattern('reviews.findForUser')
  async getReviewsForUser(
    @Payload() data: { userId: string },
  ): Promise<{ results: Review[] }> {
    const results = await this.reviewsService.getReviewsForUser(data.userId);
    return { results };
  }
}
