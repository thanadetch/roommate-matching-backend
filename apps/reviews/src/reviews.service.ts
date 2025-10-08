import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  CreateReviewDto,
  UpdateReviewDto,
  GetReviewsDto,
  ReviewWithProfile,
} from './dto';
import { Prisma, Review } from '../generated/prisma';
import type { ClientGrpc } from '@nestjs/microservices';
import { ProfilesGrpcService, ProfileIds } from '@app/common';
import { lastValueFrom } from 'rxjs';
import { Profile } from 'apps/profiles/generated/prisma';
import ReviewWhereInput = Prisma.ReviewWhereInput;

@Injectable()
export class ReviewsService implements OnModuleInit {
  private profilesService: ProfilesGrpcService;

  constructor(
    private prisma: PrismaService,
    @Inject('PROFILES_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.profilesService =
      this.client.getService<ProfilesGrpcService>('ProfilesService');
  }

  private async enrichReviewsWithProfiles(
    reviews: Review[],
  ): Promise<ReviewWithProfile[]> {
    if (reviews.length === 0) {
      return [];
    }

    // Get unique reviewee IDs
    const uniqueRevieweeIds = [
      ...new Set(reviews.map((review) => review.revieweeId)),
    ];

    try {
      // Fetch all profiles in a single batch call
      const profilesRequest: ProfileIds = { ids: uniqueRevieweeIds };
      const profilesBatch = await lastValueFrom(
        this.profilesService.getProfilesByIds(profilesRequest),
      );

      // Create a map for quick profile lookup
      const profilesMap = new Map<string, Profile>();
      profilesBatch.results.forEach((profile) => {
        profilesMap.set(profile.id, profile);
      });

      // Enrich reviews with profiles
      return reviews.map((review) => ({
        ...review,
        revieweeProfile: profilesMap.get(review.revieweeId) || undefined,
      }));
    } catch (error) {
      // If batch fetch fails, return reviews without profiles
      console.error('Failed to fetch profiles batch:', error);
      return reviews.map((review) => ({
        ...review,
        revieweeProfile: undefined,
      }));
    }
  }

  private async enrichReviewWithProfile(
    review: Review,
  ): Promise<ReviewWithProfile> {
    // For single review, use the batch method with one ID for consistency
    const enrichedReviews = await this.enrichReviewsWithProfiles([review]);
    return enrichedReviews[0];
  }

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

  async getReviews(filters: GetReviewsDto = {}): Promise<ReviewWithProfile[]> {
    const where: ReviewWhereInput = {};

    if (filters.reviewerId) {
      where.reviewerId = filters.reviewerId;
    }

    if (filters.revieweeId) {
      where.revieweeId = filters.revieweeId;
    }

    const reviews = await this.prisma.review.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return this.enrichReviewsWithProfiles(reviews);
  }

  async getReviewById(id: string): Promise<ReviewWithProfile> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return this.enrichReviewWithProfile(review);
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

  async getReviewsByUser(userId: string): Promise<ReviewWithProfile[]> {
    const reviews = await this.prisma.review.findMany({
      where: {
        reviewerId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return this.enrichReviewsWithProfiles(reviews);
  }

  async getReviewsForUser(userId: string): Promise<ReviewWithProfile[]> {
    const reviews = await this.prisma.review.findMany({
      where: {
        revieweeId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return this.enrichReviewsWithProfiles(reviews);
  }
}
