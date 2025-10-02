import { Controller } from '@nestjs/common';
import { NotificationsGatewayService } from './notifications-gateway.service';

@Controller('notifications')
export class NotificationsGatewayController {
  constructor(
    private readonly notificationsGatewayService: NotificationsGatewayService,
  ) {}
}
