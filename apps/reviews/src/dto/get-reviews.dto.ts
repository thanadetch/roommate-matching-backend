import { IsString, IsOptional } from 'class-validator';

export class GetReviewsDto {
  @IsOptional()
  @IsString()
  reviewerId?: string; // Get reviews written by a specific user

  @IsOptional()
  @IsString()
  revieweeId?: string; // Get reviews for a specific user
}
