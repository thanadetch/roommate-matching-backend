import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum NotificationType {
  INTEREST_REQUEST = 'INTEREST_REQUEST',
  MATCH_FOUND = 'MATCH_FOUND',
  MESSAGE = 'MESSAGE',
  REVIEW = 'REVIEW',
  REMINDER = 'REMINDER',
}

export enum NotificationStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
}

export class CreateNotificationDto {
  @IsString()
  userId: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsEnum(NotificationStatus)
  @IsOptional()
  status?: NotificationStatus;

  @IsString()
  title: string;

  @IsString()
  message: string;
}
