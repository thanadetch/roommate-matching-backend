import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ValidatedUser, RegisterRequestDto } from '../../../auth/src/dto';

@Injectable()
export class AuthGatewayService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,
  ) {}

  validateUser(email: string, password: string) {
    return this.authClient.send('auth.validateUser', { email, password });
  }

  register(registerData: RegisterRequestDto) {
    return this.authClient.send('auth.register', registerData);
  }

  login(user: ValidatedUser) {
    return this.authClient.send('auth.login', user);
  }
}
