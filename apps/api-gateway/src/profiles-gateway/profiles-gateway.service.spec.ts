import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesGatewayService } from './profiles-gateway.service';

describe('ProfilesGatewayService', () => {
  let service: ProfilesGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesGatewayService],
    }).compile();

    service = module.get<ProfilesGatewayService>(ProfilesGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
