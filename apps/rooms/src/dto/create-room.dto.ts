import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateRoomDto {
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
