import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateReviewDto, UpdateReviewDto, GetReviewsDto } from './dto';
import { Prisma, Review } from '../generated/prisma';
import ReviewWhereInput = Prisma.ReviewWhereInput;

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(
    reviewerId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    if (!reviewerId) {
      throw new BadRequestException('Reviewer ID is required');
    }

    // Check if user already reviewed this person
    const existingReview = await this.prisma.review.findUnique({
      where: {
        reviewerId_revieweeId: {
          reviewerId,
          revieweeId: createReviewDto.revieweeId,
        },
      },
    });

    if (existingReview) {
      // Update existing review instead of creating new one
      return this.prisma.review.update({
        where: { id: existingReview.id },
        data: {
          rating: createReviewDto.rating,
          comment: createReviewDto.comment,
        },
      });
    }

    // Create new review
    return this.prisma.review.create({
      data: {
        ...createReviewDto,
        reviewerId,
      },
    });
  }

  async getReviews(filters: GetReviewsDto = {}): Promise<Review[]> {
    const where: ReviewWhereInput = {};

    if (filters.reviewerId) {
      where.reviewerId = filters.reviewerId;
    }

    if (filters.revieweeId) {
      where.revieweeId = filters.revieweeId;
    }

    return this.prisma.review.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getReviewById(id: string): Promise<Review> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async updateReview(
    id: string,
    reviewerId: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    if (!reviewerId) {
      throw new BadRequestException('Reviewer ID is required');
    }

    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.reviewerId !== reviewerId) {
      throw new ForbiddenException('You can only update your own reviews');
    }

    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  async deleteReview(id: string, reviewerId: string): Promise<Review> {
    if (!reviewerId) {
      throw new BadRequestException('Reviewer ID is required');
    }

    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.reviewerId !== reviewerId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    return this.prisma.review.delete({
      where: { id },
    });
  }

  async getReviewsByUser(userId: string): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: {
        reviewerId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getReviewsForUser(userId: string): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: {
        revieweeId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
