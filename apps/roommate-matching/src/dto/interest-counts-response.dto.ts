import { IsNumber } from 'class-validator';

export class InterestCountsResponseDto {
  @IsNumber()
  pending: number;

  @IsNumber()
  accepted: number;

  @IsNumber()
  rejected: number;
}
