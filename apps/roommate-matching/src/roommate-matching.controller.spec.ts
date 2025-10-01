import { Test, TestingModule } from '@nestjs/testing';
import { RoommateMatchingController } from './roommate-matching.controller';
import { RoommateMatchingService } from './roommate-matching.service';

describe('RoommateMatchingController', () => {
  let roommateMatchingController: RoommateMatchingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RoommateMatchingController],
      providers: [RoommateMatchingService],
    }).compile();

    roommateMatchingController = app.get<RoommateMatchingController>(RoommateMatchingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(roommateMatchingController.getHello()).toBe('Hello World!');
    });
  });
});
