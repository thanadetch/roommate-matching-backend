import { IsEnum } from 'class-validator';
import {
  UpdateInterestStatusDto as IUpdateInterestStatusDto,
  InterestStatus,
} from '@app/common';

export class UpdateInterestStatusDto implements IUpdateInterestStatusDto {
  @IsEnum(InterestStatus)
  status: InterestStatus;
}
