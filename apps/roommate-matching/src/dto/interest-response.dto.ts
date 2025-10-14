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
}
