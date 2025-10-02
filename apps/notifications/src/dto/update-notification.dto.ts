import { IsString, IsEnum, IsOptional } from 'class-validator';
import { NotificationType, NotificationStatus } from '../../generated/prisma';

export class UpdateNotificationDto {
  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @IsOptional()
  @IsEnum(NotificationStatus)
  status?: NotificationStatus;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  message?: string;
}
