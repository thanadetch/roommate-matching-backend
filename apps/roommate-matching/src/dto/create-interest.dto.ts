import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { CreateInterestDto as ICreateInterestDto } from '@app/common';

export class CreateInterestDto implements ICreateInterestDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  hostId: string;

  @IsString()
  @IsNotEmpty()
  seekerId: string;

  @IsString()
  @IsOptional()
  message?: string;
}
