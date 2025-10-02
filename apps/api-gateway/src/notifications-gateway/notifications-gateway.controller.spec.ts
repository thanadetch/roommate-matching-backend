import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsGatewayController } from './notifications-gateway.controller';
import { NotificationsGatewayService } from './notifications-gateway.service';

describe('NotificationsGatewayController', () => {
  let controller: NotificationsGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsGatewayController],
      providers: [NotificationsGatewayService],
    }).compile();

    controller = module.get<NotificationsGatewayController>(NotificationsGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
