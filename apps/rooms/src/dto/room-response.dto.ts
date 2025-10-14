import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

enum ListingStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export class RoomResponseDto {
  @IsString()
  id: string;

  @IsString()
  hostId: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  location: string;

  @IsNumber()
  pricePerMonth: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  availableFrom?: Date;

  @IsEnum(ListingStatus)
  status: ListingStatus;

  @IsBoolean()
  noSmoking: boolean;

  @IsBoolean()
  noPets: boolean;

  @IsBoolean()
  quiet: boolean;

  @IsBoolean()
  nightOwl: boolean;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
