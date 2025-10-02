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
  findUnread(@Param('userId') userId: string) {
    return this.notificationsGatewayService.findUnread(userId);
  }

  @Get('user/:userId/count')
  getCount(@Param('userId') userId: string) {
    return this.notificationsGatewayService.getCount(userId);
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
    return this.notificationsGatewayService.markAllAsRead(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsGatewayService.remove(id);
  }

  @Delete('user/:userId/all')
  removeAllByUser(@Param('userId') userId: string) {
    return this.notificationsGatewayService.removeAllByUser(userId);
  }
}
