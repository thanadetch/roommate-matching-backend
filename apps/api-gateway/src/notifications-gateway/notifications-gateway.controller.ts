import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { NotificationsGatewayService } from './notifications-gateway.service';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from '../../../notifications/src/dto';

@Controller('notifications')
export class NotificationsGatewayController {
  constructor(
    private readonly notificationsGatewayService: NotificationsGatewayService,
  ) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsGatewayService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationsGatewayService.findAll();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.notificationsGatewayService.findByUserId(userId);
  }

  @Get('user/:userId/unread')
  findUnreadByUserId(@Param('userId') userId: string) {
    return this.notificationsGatewayService.findUnreadByUserId(userId);
  }

  @Get('user/:userId/count')
  getCountByUserId(@Param('userId') userId: string) {
    return this.notificationsGatewayService.getCountByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsGatewayService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsGatewayService.update(id, updateNotificationDto);
  }

  @Put(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsGatewayService.markAsRead(id);
  }

  @Put('user/:userId/read-all')
  markAllAsRead(@Param('userId') userId: string) {
    return this.notificationsGatewayService.markAllAsReadByUserId(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsGatewayService.remove(id);
  }

  @Delete('user/:userId/all')
  removeAllByUserId(@Param('userId') userId: string) {
    return this.notificationsGatewayService.removeAllByUserId(userId);
  }
}
