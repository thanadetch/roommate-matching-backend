import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InterestStatus } from '../../generated/prisma';
import { RoomResponseDto } from '../../../rooms/src/dto/room-response.dto';
import { ProfileResponseDto } from '../../../profiles/src/dto/profile-response.dto';

export class InterestResponseDto {
  @IsString()
  id: string;

  @IsString()
  roomId: string;

  @IsString()
  hostId: string;

  @IsString()
  seekerId: string;

  @IsString()
  @IsOptional()
  message?: string | null;

  @IsEnum(InterestStatus)
  status: InterestStatus;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ValidateNested()
  @Type(() => RoomResponseDto)
  @IsOptional()
  room?: RoomResponseDto | null;

  @ValidateNested()
  @Type(() => ProfileResponseDto)
  @IsOptional()
  host?: ProfileResponseDto | null;

  @ValidateNested()
  @Type(() => ProfileResponseDto)
  @IsOptional()
  seeker?: ProfileResponseDto | null;
}
