import { IsString, IsOptional, IsNotEmpty, IsNumber, IsArray, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsOptional()
  rules?: any;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  availableFrom?: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  lifestyle?: string[];

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
