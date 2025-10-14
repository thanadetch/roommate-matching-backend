import { IsString, IsOptional, IsEnum } from 'class-validator';
import {
  GetInterestsQueryDto as IGetInterestsQueryDto,
  InterestStatus,
} from '@app/common';

export class GetInterestsDto implements IGetInterestsQueryDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsEnum(InterestStatus)
  @IsOptional()
  status?: InterestStatus;

  @IsString()
  @IsOptional()
  roomId?: string;
}
