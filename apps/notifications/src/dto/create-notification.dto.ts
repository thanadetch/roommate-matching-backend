import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { NotificationType, NotificationStatus } from '../../generated/prisma';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsEnum(NotificationStatus)
  status?: NotificationStatus;
}
