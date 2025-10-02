import { Test, TestingModule } from '@nestjs/testing';
import { RoommateMatchingGatewayService } from './roommate-matching-gateway.service';

describe('RoommateMatchingGatewayService', () => {
  let service: RoommateMatchingGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoommateMatchingGatewayService],
    }).compile();

    service = module.get<RoommateMatchingGatewayService>(RoommateMatchingGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
