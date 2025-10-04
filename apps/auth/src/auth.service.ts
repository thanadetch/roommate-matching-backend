import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto';
import type { ValidatedUser } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: ValidatedUser): LoginResponseDto {
    const payload = { sub: user.userId, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
