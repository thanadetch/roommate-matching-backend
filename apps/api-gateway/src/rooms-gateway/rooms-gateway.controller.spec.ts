import { Test, TestingModule } from '@nestjs/testing';
import { RoomsGatewayController } from './rooms-gateway.controller';
import { RoomsGatewayService } from './rooms-gateway.service';

describe('RoomsGatewayController', () => {
  let controller: RoomsGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsGatewayController],
      providers: [RoomsGatewayService],
    }).compile();

    controller = module.get<RoomsGatewayController>(RoomsGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
