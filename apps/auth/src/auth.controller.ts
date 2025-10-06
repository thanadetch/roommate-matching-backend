import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import type {
  RegisterRequestDto,
  ValidatedUser,
  ValidateUserRequestDto,
  LoginResponseDto,
} from './dto';
import { Profile } from 'apps/profiles/generated/prisma';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.login')
  login(@Payload() user: ValidatedUser): LoginResponseDto {
    return this.authService.login(user);
  }

  @MessagePattern('auth.validateUser')
  async validateUser(
    @Payload() data: ValidateUserRequestDto,
  ): Promise<ValidatedUser | null> {
    return this.authService.validateUser(data);
  }

  @MessagePattern('auth.register')
  async register(@Payload() data: RegisterRequestDto): Promise<Profile> {
    return this.authService.register(data);
  }
}
