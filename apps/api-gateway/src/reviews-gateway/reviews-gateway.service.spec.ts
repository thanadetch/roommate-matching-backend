import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsGatewayService } from './reviews-gateway.service';

describe('ReviewsGatewayService', () => {
  let service: ReviewsGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsGatewayService],
    }).compile();

    service = module.get<ReviewsGatewayService>(ReviewsGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
