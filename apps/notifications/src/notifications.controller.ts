import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Create a new notification
  @MessagePattern('notifications.create')
  async create(@Payload() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  // Get all notifications
  @MessagePattern('notifications.findAll')
  async findAll() {
    console.log('Finding all notifications');
    return this.notificationsService.findAll();
  }

  // Get notifications by user ID
  @MessagePattern('notifications.findByUserId')
  async findByUserId(@Payload() data: { userId: string }) {
    return this.notificationsService.findByUserId(data.userId);
  }

  // Get unread notifications by user ID
  @MessagePattern('notifications.findUnread')
  async findUnread(@Payload() data: { userId: string }) {
    return this.notificationsService.findUnreadByUserId(data.userId);
  }

  // Get notification count by user ID
  @MessagePattern('notifications.getCount')
  async getCount(@Payload() data: { userId: string }) {
    return this.notificationsService.getCountByUserId(data.userId);
  }

  // Get notification by ID
  @MessagePattern('notifications.findOne')
  async findOne(@Payload() data: { id: string }) {
    const notification = await this.notificationsService.findOne(data.id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    return notification;
  }

  // Update notification
  @MessagePattern('notifications.update')
  async update(
    @Payload() data: { id: string; updateData: UpdateNotificationDto },
  ) {
    return this.notificationsService.update(data.id, data.updateData);
  }

  // Mark notification as read
  @MessagePattern('notifications.markAsRead')
  async markAsRead(@Payload() data: { id: string }) {
    return this.notificationsService.markAsRead(data.id);
  }

  // Mark all user notifications as read
  @MessagePattern('notifications.markAllAsRead')
  async markAllAsRead(@Payload() data: { userId: string }) {
    return this.notificationsService.markAllAsReadByUserId(data.userId);
  }

  // Delete notification
  @MessagePattern('notifications.remove')
  async remove(@Payload() data: { id: string }) {
    return this.notificationsService.remove(data.id);
  }

  // Delete all notifications for a user
  @MessagePattern('notifications.removeAllByUser')
  async removeAllByUser(@Payload() data: { userId: string }) {
    return this.notificationsService.removeAllByUserId(data.userId);
  }
}
