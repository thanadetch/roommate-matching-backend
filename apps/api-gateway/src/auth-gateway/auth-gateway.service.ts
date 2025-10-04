import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ValidatedUser } from '../../../auth/src/dto';

@Injectable()
export class AuthGatewayService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly notificationsClient: ClientProxy,
  ) {}

  login(user: ValidatedUser) {
    return this.notificationsClient.send('auth.login', user);
  }
}
