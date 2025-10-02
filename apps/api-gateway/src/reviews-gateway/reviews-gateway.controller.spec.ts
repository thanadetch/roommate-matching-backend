import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsGatewayController } from './reviews-gateway.controller';
import { ReviewsGatewayService } from './reviews-gateway.service';

describe('ReviewsGatewayController', () => {
  let controller: ReviewsGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsGatewayController],
      providers: [ReviewsGatewayService],
    }).compile();

    controller = module.get<ReviewsGatewayController>(ReviewsGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
