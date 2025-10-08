import { IsString } from 'class-validator';

export class GetProfileDto {
  @IsString()
  id: string;
}

export class GetProfileByEmailDto {
  @IsString()
  email: string;
}
