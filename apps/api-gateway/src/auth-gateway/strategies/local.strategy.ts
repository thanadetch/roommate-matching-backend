import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGatewayService } from '../auth-gateway.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authGatewayService: AuthGatewayService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await lastValueFrom(
      this.authGatewayService.validateUser(email, password),
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
