import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { ValidatedUser } from '../../../auth/src/dto';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: ValidatedUser }) {
    return this.authGatewayService.login(req.user);
  }
}
