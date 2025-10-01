import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

describe('ReviewsController', () => {
  let reviewsController: ReviewsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [ReviewsService],
    }).compile();

    reviewsController = app.get<ReviewsController>(ReviewsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(reviewsController.getHello()).toBe('Hello World!');
    });
  });
});
