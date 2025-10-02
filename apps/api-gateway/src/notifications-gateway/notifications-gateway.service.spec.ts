import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsGatewayService } from './notifications-gateway.service';

describe('NotificationsGatewayService', () => {
  let service: NotificationsGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsGatewayService],
    }).compile();

    service = module.get<NotificationsGatewayService>(NotificationsGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
