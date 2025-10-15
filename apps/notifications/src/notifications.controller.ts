import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('notifications.create')
  create(@Payload() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @MessagePattern('notifications.findAll')
  findAll() {
    return this.notificationsService.findAll();
  }

  @MessagePattern('notifications.findByUserId')
  findByUserId(@Payload() userId: string) {
    return this.notificationsService.findByUserId(userId);
  }

  @MessagePattern('notifications.findUnreadByUserId')
  findUnreadByUserId(@Payload() userId: string) {
    return this.notificationsService.findUnreadByUserId(userId);
  }

  @MessagePattern('notifications.findOne')
  findOne(@Payload() id: string) {
    return this.notificationsService.findOne(id);
  }

  @MessagePattern('notifications.update')
  update(
    @Payload()
    data: {
      id: string;
      updateNotificationDto: UpdateNotificationDto;
    },
  ) {
    return this.notificationsService.update(
      data.id,
      data.updateNotificationDto,
    );
  }

  @MessagePattern('notifications.markAsRead')
  markAsRead(@Payload() id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @MessagePattern('notifications.markAllAsReadByUserId')
  markAllAsReadByUserId(@Payload() userId: string) {
    return this.notificationsService.markAllAsReadByUserId(userId);
  }

  @MessagePattern('notifications.remove')
  remove(@Payload() id: string) {
    return this.notificationsService.remove(id);
  }

  @MessagePattern('notifications.removeAllByUserId')
  removeAllByUserId(@Payload() userId: string) {
    return this.notificationsService.removeAllByUserId(userId);
  }

  @MessagePattern('notifications.getCountByUserId')
  getCountByUserId(@Payload() userId: string) {
    return this.notificationsService.getCountByUserId(userId);
  }
}
