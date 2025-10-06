import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGatewayService } from '../auth-gateway.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authGatewayService: AuthGatewayService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authGatewayService.validateUser(email, password).toPromise();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Remove password from the returned user object for security
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
