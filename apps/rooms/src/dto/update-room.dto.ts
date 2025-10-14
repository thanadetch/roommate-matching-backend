import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  hostId?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  @IsOptional()
  pricePerMonth?: number;

  @IsDateString()
  @IsOptional()
  availableFrom?: string;

  @IsBoolean()
  @IsOptional()
  noSmoking?: boolean;

  @IsBoolean()
  @IsOptional()
  petFriendly?: boolean;

  @IsBoolean()
  @IsOptional()
  quiet?: boolean;

  @IsBoolean()
  @IsOptional()
  nightOwl?: boolean;
}
