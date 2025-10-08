import {
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Gender } from '../../generated/prisma';

export class CreateProfileDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsNumber()
  budgetMin?: number;

  @IsOptional()
  @IsNumber()
  budgetMax?: number;

  @IsOptional()
  @IsString()
  preferredArea?: string;

  // Lifestyle preferences (individual boolean fields)
  @IsOptional()
  @IsBoolean()
  smoking?: boolean;

  @IsOptional()
  @IsBoolean()
  petOwner?: boolean;

  @IsOptional()
  @IsBoolean()
  nightOwl?: boolean;

  @IsOptional()
  @IsBoolean()
  quietPerson?: boolean;

  // Contact information
  @IsOptional()
  @IsString()
  contactLine?: string;

  @IsOptional()
  @IsString()
  contactEmail?: string;
}
