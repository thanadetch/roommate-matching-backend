import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import type { ValidatedUser } from './dto';
import { LoginResponseDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.login')
  login(@Payload() user: ValidatedUser): LoginResponseDto {
    return this.authService.login(user);
  }
}
