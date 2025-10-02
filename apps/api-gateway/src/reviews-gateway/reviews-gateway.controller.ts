import { Controller } from '@nestjs/common';
import { ReviewsGatewayService } from './reviews-gateway.service';

@Controller('reviews')
export class ReviewsGatewayController {
  constructor(private readonly reviewsGatewayService: ReviewsGatewayService) {}
}
