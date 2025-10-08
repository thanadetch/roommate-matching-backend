import { IsArray, IsString } from 'class-validator';

export class GetProfilesBatchDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
