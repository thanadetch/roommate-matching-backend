import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesGatewayController } from './profiles-gateway.controller';
import { ProfilesGatewayService } from './profiles-gateway.service';

describe('ProfilesGatewayController', () => {
  let controller: ProfilesGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesGatewayController],
      providers: [ProfilesGatewayService],
    }).compile();

    controller = module.get<ProfilesGatewayController>(ProfilesGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
