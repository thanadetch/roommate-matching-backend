import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { InterestResponseDto } from './interest-response.dto';

export class MatchesResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  asHost: InterestResponseDto[];

  @IsArray()
  @ValidateNested({ each: true })
  asSeeker: InterestResponseDto[];

  @IsNumber()
  total: number;
}
