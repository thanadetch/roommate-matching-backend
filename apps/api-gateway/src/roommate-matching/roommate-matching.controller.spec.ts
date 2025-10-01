import { Test, TestingModule } from '@nestjs/testing';
import { RoommateMatchingController } from './roommate-matching.controller';
import { RoommateMatchingService } from './roommate-matching.service';

describe('RoommateMatchingController', () => {
  let controller: RoommateMatchingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoommateMatchingController],
      providers: [RoommateMatchingService],
    }).compile();

    controller = module.get<RoommateMatchingController>(RoommateMatchingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
