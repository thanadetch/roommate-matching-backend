import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { NotificationStatus } from '../generated/prisma';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  // Create a new notification
  async create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: createNotificationDto,
    });
  }

  // Get all notifications
  async findAll() {
    return this.prisma.notification.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Get notifications by user ID
  async findByUserId(userId: string) {
    return this.prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Get unread notifications by user ID
  async findUnreadByUserId(userId: string) {
    return this.prisma.notification.findMany({
      where: {
        userId,
        status: NotificationStatus.UNREAD,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Get notification by ID
  async findOne(id: string) {
    return this.prisma.notification.findUnique({
      where: { id },
    });
  }

  // Update notification
  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
    });
  }

  // Mark notification as read
  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: {
        status: NotificationStatus.READ,
      },
    });
  }

  // Mark all user notifications as read
  async markAllAsReadByUserId(userId: string) {
    return this.prisma.notification.updateMany({
      where: {
        userId,
        status: NotificationStatus.UNREAD,
      },
      data: {
        status: NotificationStatus.READ,
      },
    });
  }

  // Delete notification
  async remove(id: string) {
    return this.prisma.notification.delete({
      where: { id },
    });
  }

  // Delete all notifications for a user
  async removeAllByUserId(userId: string) {
    return this.prisma.notification.deleteMany({
      where: { userId },
    });
  }

  // Get notification count by user ID
  async getCountByUserId(userId: string) {
    const total = await this.prisma.notification.count({
      where: { userId },
    });

    const unread = await this.prisma.notification.count({
      where: {
        userId,
        status: NotificationStatus.UNREAD,
      },
    });

    return { total, unread };
  }
}
