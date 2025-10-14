import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Req,
} from '@nestjs/common';
import { ReviewsGatewayService } from './reviews-gateway.service';
import { Observable } from 'rxjs';
import type {
  CreateReviewDto,
  UpdateReviewDto,
  GetReviewsDto,
  ReviewsResponse,
} from '../../../reviews/src/dto';
import { Review } from '../../../reviews/generated/prisma';
import type { AuthenticatedRequest } from '../../../auth/src/dto';

@Controller('reviews')
export class ReviewsGatewayController {
  constructor(private readonly reviewsGatewayService: ReviewsGatewayService) {}

  // REST API endpoints
  @Post()
  createReview(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: AuthenticatedRequest,
  ): Observable<Review> {
    const reviewerId = req.user?.sub;
    return this.reviewsGatewayService.createReview(
      reviewerId!,
      createReviewDto,
    );
  }

  @Get()
  getReviews(@Query() filters: GetReviewsDto): Observable<ReviewsResponse> {
    return this.reviewsGatewayService.getReviews(filters);
  }

  // get reviews written by a reviewer
  @Get('by-user/:userId')
  getReviewsByUser(
    @Param('userId') userId: string,
  ): Observable<ReviewsResponse> {
    return this.reviewsGatewayService.getReviewsByUser(userId);
  }

  // get reviews for reviewee
  @Get('for-user/:userId')
  getReviewsForUser(
    @Param('userId') userId: string,
  ): Observable<ReviewsResponse> {
    return this.reviewsGatewayService.getReviewsForUser(userId);
  }

  @Get(':id')
  getReviewById(@Param('id') id: string): Observable<Review> {
    return this.reviewsGatewayService.getReviewById(id);
  }

  @Put(':id')
  updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @Req() req: AuthenticatedRequest,
  ): Observable<Review> {
    const reviewerId = req.user?.sub;
    return this.reviewsGatewayService.updateReview(
      id,
      reviewerId!,
      updateReviewDto,
    );
  }

  @Delete(':id')
  deleteReview(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ): Observable<Review> {
    const reviewerId = req.user?.sub;
    return this.reviewsGatewayService.deleteReview(id, reviewerId!);
  }
}
