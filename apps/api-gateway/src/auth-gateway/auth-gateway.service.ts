import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ValidatedUser } from '../../../auth/src/dto';

@Injectable()
export class AuthGatewayService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,
  ) {}

  login(user: ValidatedUser) {
    return this.authClient.send('auth.login', user);
  }
}
