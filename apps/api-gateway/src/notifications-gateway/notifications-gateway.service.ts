import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from '../../../notifications/src/dto';

@Injectable()
export class NotificationsGatewayService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationsClient: ClientProxy,
  ) {}

  // Create a new notification
  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationsClient.send(
      'notifications.create',
      createNotificationDto,
    );
  }

  // Get all notifications
  findAll() {
    return this.notificationsClient.send('notifications.findAll', {});
  }

  // Get notifications by user ID
  findByUserId(userId: string) {
    return this.notificationsClient.send('notifications.findByUserId', userId);
  }

  // Get unread notifications by user ID
  findUnreadByUserId(userId: string) {
    return this.notificationsClient.send(
      'notifications.findUnreadByUserId',
      userId,
    );
  }

  // Get notification count by user ID
  getCountByUserId(userId: string) {
    return this.notificationsClient.send(
      'notifications.getCountByUserId',
      userId,
    );
  }

  // Get notification by ID
  findOne(id: string) {
    return this.notificationsClient.send('notifications.findOne', id);
  }

  // Update notification
  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsClient.send('notifications.update', {
      id,
      updateNotificationDto,
    });
  }

  // Mark notification as read
  markAsRead(id: string) {
    return this.notificationsClient.send('notifications.markAsRead', id);
  }

  // Mark all user notifications as read
  markAllAsReadByUserId(userId: string) {
    return this.notificationsClient.send(
      'notifications.markAllAsReadByUserId',
      userId,
    );
  }

  // Delete notification
  remove(id: string) {
    return this.notificationsClient.send('notifications.remove', id);
  }

  // Delete all notifications for a user
  removeAllByUserId(userId: string) {
    return this.notificationsClient.send(
      'notifications.removeAllByUserId',
      userId,
    );
  }
}
