import { Test, TestingModule } from '@nestjs/testing';
import { RoommateMatchingGatewayController } from './roommate-matching-gateway.controller';
import { RoommateMatchingGatewayService } from './roommate-matching-gateway.service';

describe('RoommateMatchingGatewayController', () => {
  let controller: RoommateMatchingGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoommateMatchingGatewayController],
      providers: [RoommateMatchingGatewayService],
    }).compile();

    controller = module.get<RoommateMatchingGatewayController>(RoommateMatchingGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
