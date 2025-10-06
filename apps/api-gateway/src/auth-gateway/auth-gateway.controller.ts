import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import type { RegisterRequestDto, ValidatedUser } from 'apps/auth/src/dto';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterRequestDto) {
    return this.authGatewayService.register(registerDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: ValidatedUser }) {
    return this.authGatewayService.login(req.user);
  }
}
